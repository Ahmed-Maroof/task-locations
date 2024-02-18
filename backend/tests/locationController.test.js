const LocationController = require('../controllers/locationController');

describe('LocationController', () => {
    describe('createLocation', () => {
        it('should create a new location entry', async () => {
            // Mock request and response objects
            const req = {
                body: {
                    title: 'Test Location',
                    latitude: 40.7128,
                    longitude: -74.0060
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Call the controller function
            await LocationController.createLocation(req, res);

            // Expect appropriate response status and JSON data
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });

    describe('getAllLocations', () => {
        it('should fetch all location entries', async () => {
            // Mock request and response objects
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Call the controller function
            await LocationController.getAllLocations(req, res);

            // Expect appropriate response status and JSON data
            expect(res.status).toHaveBeenCalledWith(200);
            // You can add more specific assertions based on the expected data
        });
    });
});
