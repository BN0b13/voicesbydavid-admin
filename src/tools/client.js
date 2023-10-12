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

    // Messages

    async getMessages() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/contact`, requestOptions);
        const res = await account.json();
        return res;
    }

    async getMessageById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const account = await fetch(`${api}/admin/contact/${id}`, requestOptions);
        const res = await account.json();
        return res;
    }

    async updateMessage(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/contact`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    // Reels

    async getReels() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeImage = await fetch(`${api}/reels`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async getReelById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getWelcomeImage = await fetch(`${api}/admin/reels/all/${id}`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async changeActivationStatus(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/reels/activate`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }


    async deleteReel(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const welcomeImage = await fetch(`${api}/admin/reels`, requestOptions);
        const res = await welcomeImage.json();
        return res;
    }

    //// Video

    async getVideoReels() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get);
        const getWelcomeImage = await fetch(`${api}/reels/video`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async postVideo(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postWelcomeImage = await fetch(`${api}/admin/reels/video`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    //// Youtube

    async postYoutubeReel(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true);
        const postWelcomeImage = await fetch(`${api}/admin/reels/youtube`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    async updateYoutubeReel(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true);
        const patchWelcomeImage = await fetch(`${api}/admin/reels/youtube`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    // Testimonials

    async getTestimonials() {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getWelcomeImage = await fetch(`${api}/testimonials`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async getTestimonialById(id) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const getWelcomeImage = await fetch(`${api}/admin/testimonials/${id}`, requestOptions);
        const res = await getWelcomeImage.json();
        return res;
    }

    async postTestimonial(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data, true, true);
        const postWelcomeImage = await fetch(`${api}/admin/testimonials`, requestOptions);
        const res = await postWelcomeImage.json();
        return res;
    }

    async updateTestimonial(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.patch, data, true, true);
        const patchWelcomeImage = await fetch(`${api}/admin/testimonials`, requestOptions);
        const res = await patchWelcomeImage.json();
        return res;
    }

    async deleteTestimonial(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.delete, data, true);
        const welcomeImage = await fetch(`${api}/admin/testimonials`, requestOptions);
        const res = await welcomeImage.json();
        return res;
    }

    // Users

    async isPasswordRestTokenValid(token) {
        const requestOptions = this.fetchOptions(this.fetchMethods.get, '', true);
        const isEmailTokenValid = await fetch(`${api}/user/reset-password-token/verify/${token}`, requestOptions);
        const res = await isEmailTokenValid.json();
        return res;
    }

    async passwordResetEmail(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data);
        const passwordResetEmail = await fetch(`${api}/user/reset-password`, requestOptions);
        const res = await passwordResetEmail.json();
        return res;
    }

    async completePasswordReset(data) {
        const requestOptions = this.fetchOptions(this.fetchMethods.post, data);
        const completePasswordReset = await fetch(`${api}/user/reset-password/token`, requestOptions);
        const res = await completePasswordReset.json();
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