const fs = require('fs');
const path = require('path');
const { uploadFile, downloadFile } = require('../controllers/imageController');

// Mock req and res objects
const req = {
    file: {
        path: 'test/path/to/file.txt'
    },
    params: {
        fileName: 'file.txt'
    }
};

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    download: jest.fn()
};

// Mock fs.existsSync to return true
jest.mock('fs');
fs.existsSync.mockReturnValue(true);

describe('File Controller', () => {
    describe('uploadFile', () => {
        it('should upload a file successfully', () => {
            uploadFile(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'File uploaded successfully',
                filePath: req.file.path
            });
        });

        it('should return an error if no file is uploaded', () => {
            req.file = undefined;
            uploadFile(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'No file uploaded' });
        });
    });

    describe('downloadFile', () => {
        it('should download a file successfully', () => {
            downloadFile(req, res);
            const filePath = path.join(__dirname, '..', 'uploads', req.params.fileName);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.download).toHaveBeenCalledWith(filePath);
        });

        it('should return a 404 error if the file does not exist', () => {
            fs.existsSync.mockReturnValueOnce(false);
            downloadFile(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'File not found' });
        });

        it('should handle internal server error', () => {
            fs.existsSync.mockImplementation(() => { throw new Error('Mock error'); });
            downloadFile(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });
});
