import { createRouter, createWebHistory } from 'vue-router';
import UploadFile from './components/UploadFile.vue';
import ContinueFileDetails from './components/ContinueFileDetails.vue';
import AllLocations from "@/components/AllLocations.vue";

const routes = [
    { path: '/', component: UploadFile },
    { path: '/details', component: ContinueFileDetails },
    { path: '/all-locations', component: AllLocations }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
