import { getSettings } from "@/api/settings";

const StoreModuleSettings = {
    namespaced: true,
    state: {
        page: {},
        banner: [],
    },
    actions: {
        async getSettings() {
            
        }
    }
};

export default StoreModuleSettings;