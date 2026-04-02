/**
 * script.js — مساعد نقل البيانات بين صفحات YADWOR
 * يُستخدم لحفظ واسترجاع البيانات المشتركة عبر sessionStorage
 */

const YW = {

    // ===== حفظ بيانات المستخدم الحالي =====
    saveUser(userData) {
        sessionStorage.setItem('yw_user', JSON.stringify(userData));
    },

    getUser() {
        try { return JSON.parse(sessionStorage.getItem('yw_user')); } catch { return null; }
    },

    clearUser() {
        sessionStorage.removeItem('yw_user');
    },

    // ===== حفظ بيانات الغرفة المراد الدخول إليها =====
    saveRoomTarget(data) {
        // data: { roomId, roomType, roomCode, roomName }
        sessionStorage.setItem('yw_room_target', JSON.stringify(data));
    },

    getRoomTarget() {
        try { return JSON.parse(sessionStorage.getItem('yw_room_target')); } catch { return null; }
    },

    clearRoomTarget() {
        sessionStorage.removeItem('yw_room_target');
    },

    // ===== حفظ وضع الغرفة المنشأة (video / voice) =====
    saveRoomMode(mode) {
        sessionStorage.setItem('yw_room_mode', mode);
    },

    getRoomMode() {
        return sessionStorage.getItem('yw_room_mode') || 'video';
    },

    // ===== بيانات الغرفة النشطة =====
    saveActiveRoom(data) {
        // data: { roomId, isTeacher, roomName, roomType, roomCode }
        sessionStorage.setItem('yw_active_room', JSON.stringify(data));
    },

    getActiveRoom() {
        try { return JSON.parse(sessionStorage.getItem('yw_active_room')); } catch { return null; }
    },

    clearActiveRoom() {
        sessionStorage.removeItem('yw_active_room');
        sessionStorage.removeItem('yw_room_mode');
    },

    // ===== إعادة توجيه مع حفظ البيانات =====
    goToLogin() {
        window.location.href = 'roomlogin.html';
    },

    goToHome() {
        window.location.href = 'roomhom.html';
    },

    goToVideoRoom() {
        window.location.href = 'roomvideo.html';
    },

    goToVoiceRoom() {
        window.location.href = 'roomvoice.html';
    },

    // ===== فحص تسجيل الدخول =====
    isLoggedIn() {
        return !!this.getUser();
    },

    requireLogin() {
        if (!this.isLoggedIn()) {
            this.goToLogin();
            return false;
        }
        return true;
    },

    // ===== صور افتراضية =====
    getRandomAvatar() {
        return `imgt${Math.floor(Math.random() * 10) + 1}.png`;
    },

    getAvatarUrl(userData) {
        return (userData && userData.avatar) ? userData.avatar : this.getRandomAvatar();
    },

    // ===== تنسيق الأرقام =====
    formatNum(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(n || 0);
    }
};

// تصدير للاستخدام كـ module أو عالمياً
if (typeof module !== 'undefined') module.exports = YW;
