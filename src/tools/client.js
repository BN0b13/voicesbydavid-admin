import { 
    api,
    tokenName
} from '../config';

export default class Client {
    token = localStorage.getItem(tokenName);
    fetchMethods = {
        get: 'GET',
        post: 'POST',
        patch: 'PATCH',
        delete: 'DELETE'
    }
    
    fetchOptions(method, body = null, withToken = false, image = false) {
        let modifiedBody = JSON.stringify(body);
        const headers = new Headers();
        if(withToken) {
            headers.append("Authorization", `Bearer ${this.token}`);
            headers.append("Access-Control-Request-Method", `${method}`);
            headers.append("Access-Control-Request-Headers", 'origin, x-requested-with');
            headers.append("Origin", "https://admin.voicesbydavid.com");
        }
        if(image) {
            modifiedBody = body;
        } else {
            headers.append("Accept", "Bearer application/json");
            headers.append("Content-Type", "application/json");
        }

        if(body) {
            return {
                method,
                headers,
                body: modifiedBody
            };
        }

        return {
            method,
            headers
        }   
    }

    // Accounts

    async getAccountById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/user/${id}`, requestOptions);
        const res = await account.json();
        return res;
    }

    // Categories

    async getCategories() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoriesWithoutAssociations() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoryById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/${id}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async getCategoryByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const categories = await fetch(`${api}/categories/type/${type}`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async createCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async updateCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    async deleteCategory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const categories = await fetch(`${api}/admin/categories`, requestOptions);
        const res = await categories.json();
        return res;
    }

    // Configuration

    async getWelcomeImages() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeImage = await fetch(`${api}/welcome/images`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async postWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    async updateWelcomeImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    async deleteImages(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const welcomeImage = await fetch(`${api}/admin/welcome/images`, requestOptions);
        const res = await welcomeImage.json();
        return res;
    }

    async getWelcomeContent() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeContent = await fetch(`${api}/welcome/content`, requestOptions);
        const res = await getWelcomeContent.json();
        return res;
    }

    // Customers

    async getCustomers() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/customers`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Employees

    async getEmployees() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const customers = await fetch(`${api}/admin/employees`, requestOptions);
        const res = await customers.json();
        return res;
    }

    // Inventory

    async getInventory() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async getInventoryById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/inventory/id`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async updateInventory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async deleteInventory(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const inventory = await fetch(`${api}/admin/inventory`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    // Orders

    async getOrders() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async getOrderByRefId(refId) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const orders = await fetch(`${api}/admin/orders/search/ref-id/${refId}`, requestOptions);
        const res = await orders.json();
        return res;
    }

    async updateOrder(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    async sendPaymentLink(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders/payment-link`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    async shipOrder(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchOrder = await fetch(`${api}/admin/orders/ship`, requestOptions);
        const res = await patchOrder.json();
        return res;
    }

    // Products

    async getProducts() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductsByType(type) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const products = await fetch(`${api}/products/type/${type}`, requestOptions);
        const res = await products.json();
        return res;
    }

    async getProductById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const product = await fetch(`${api}/products/${id}`, requestOptions);
        const res = await product.json();
        return res;
    }

    async getProductInventory() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const inventory = await fetch(`${api}/admin/products`, requestOptions);
        const res = await inventory.json();
        return res;
    }

    async getProductsByCategoryId(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const productTypes = await fetch(`${api}/admin/products/category/${id}`, requestOptions);
        const res = await productTypes.json();
        return res;
    }

    async getProductTypes() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const productTypes = await fetch(`${api}/admin/products/product-types`, requestOptions);
        const res = await productTypes.json();
        return res;
    }

    async getProductProfiles() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const productProfiles = await fetch(`${api}/products/profiles/all`, requestOptions);
        const res = await productProfiles.json();
        return res;
    }

    async createProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const product = await fetch(`${api}/admin/products`, requestOptions);
        const res = await product.json();
        return res;
    }

    async createProductProfile(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const productProfile = await fetch(`${api}/admin/products/profiles`, requestOptions);
        const res = await productProfile.json();
        return res;
    }

    async addProductImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true, true);
        const productImage = await fetch(`${api}/admin/products/images`, requestOptions);
        const res = await productImage.json();
        return res;
    }

    async updateProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const updateProduct = await fetch(`${api}/admin/products`, requestOptions);
        const res = await updateProduct.json();
        return res;
    }

    async deleteProduct(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteProduct = await fetch(`${api}/admin/products`, requestOptions);
        const res = await deleteProduct.json();
        return res;
    }

    async deleteProductImage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const deleteProductImage = await fetch(`${api}/admin/products/product-image`, requestOptions);
        const res = await deleteProductImage.json();
        return res;
    }

    // Views

    async getViews() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/visits`, requestOptions);
        const res = await account.json();
        return res;
    }
}