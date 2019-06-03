"use strict";
/**
 * Check if localStorage is supported                       const isSupported: boolean
 * Check if localStorage has an Item                        function hasItem(key: string): boolean
 * Get the amount of space left in localStorage             function getRemainingSpace(): number
 * Get the maximum amount of space in localStorage          function getMaximumSpace(): number
 * Get the used space in localStorage                       function getUsedSpace(): number
 * Get the used space of an item in localStorage            function getItemUsedSpace(): number
 * Backup Assosiative Array                                 interface Backup
 * Get a Backup of localStorage                             function getBackup(): Backup
 * Apply a Backup to localStorage                           function applyBackup(backup: Backup, fClear: boolean = true, fOverwriteExisting: boolean = true)
 * Dump all information of localStorage in the console      function consoleInfo(fShowMaximumSize: boolean = false)
 */
var LocalStorage;
(function (LocalStorage) {
    /**
     * Flag set true if the Browser supports localStorage, widthout affecting it
     */
    LocalStorage.isSupported = (function () {
        try {
            var itemBackup = localStorage.getItem('');
            localStorage.removeItem('');
            localStorage.setItem('', '');
            if (itemBackup === null) {
                localStorage.removeItem('');
            }
            else {
                localStorage.setItem('', itemBackup);
            }
            return true;
        }
        catch (e) {
            return false;
        }
    })();
    /**
     * Check if localStorage has an Item / exists with the give key
     * @param key the key of the Item
     */
    function hasItem(key) {
        return localStorage.getItem(key) !== null;
    }
    LocalStorage.hasItem = hasItem;
    /**
     * This will return the left space in localStorage without affecting it's content
     * Might be slow !!!
     */
    function getRemainingSpace() {
        var itemBackup = localStorage.getItem('');
        var increase = true;
        var data = '1';
        var totalData = '';
        var trytotalData = '';
        while (true) {
            try {
                trytotalData = totalData + data;
                localStorage.setItem('', trytotalData);
                totalData = trytotalData;
                if (increase) {
                    data += data;
                }
            }
            catch (e) {
                if (data.length < 2) {
                    break;
                }
                increase = false;
                data = data.substr(data.length / 2);
            }
        }
        if (itemBackup === null) {
            localStorage.removeItem('');
        }
        else {
            localStorage.setItem('', itemBackup);
        }
        return totalData.length - (itemBackup !== null ? itemBackup.length : 0);
    }
    LocalStorage.getRemainingSpace = getRemainingSpace;
    /**
     * This function returns the maximum size of localStorage without affecting it's content
     * Might be slow !!!
     */
    function getMaximumSpace() {
        var backup = getBackup();
        localStorage.clear();
        var max = getRemainingSpace();
        applyBackup(backup);
        return max;
    }
    LocalStorage.getMaximumSpace = getMaximumSpace;
    /**
     * This will return the currently used size of localStorage
     */
    function getUsedSpace() {
        var sum = 0;
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            sum += key.length + value.length;
        }
        return sum;
    }
    LocalStorage.getUsedSpace = getUsedSpace;
    /**
     * This will return the currently used size of a given Item, returns NaN if key is not found
     * @param key
     */
    function getItemUsedSpace(key) {
        var value = localStorage.getItem(key);
        if (value === null) {
            return NaN;
        }
        else {
            return key.length + value.length;
        }
    }
    LocalStorage.getItemUsedSpace = getItemUsedSpace;
    /**
     * This will return a localStorage-backup (Associative-Array key->value)
     */
    function getBackup() {
        var backup = {};
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            backup[key] = value;
        }
        return backup;
    }
    LocalStorage.getBackup = getBackup;
    /**
     * This will apply a localStorage-Backup (Associative-Array key->value)
     * @param backup            associative-array
     * @param fClear             optional flag to clear all existing storage first. Default: true
     * @param fOverwriteExisting optional flag to replace existing keys. Default: true
     */
    function applyBackup(backup, fClear, fOverwriteExisting) {
        if (fClear === void 0) { fClear = true; }
        if (fOverwriteExisting === void 0) { fOverwriteExisting = true; }
        if (fClear == true) {
            localStorage.clear();
        }
        for (var key in backup) {
            if (fOverwriteExisting === false && backup[key] !== undefined) {
                continue;
            }
            var value = backup[key];
            localStorage.setItem(key, value);
        }
    }
    LocalStorage.applyBackup = applyBackup;
    /**
     * This functions dumps all keys and values of the local Storage to the console,
     * as well as the current size and number of items
     * @param fShowMaximumSize optional, flag show maximum size of localStorage. Default: false
     */
    function consoleInfo(fShowMaximumSize) {
        if (fShowMaximumSize === void 0) { fShowMaximumSize = false; }
        var amount = 0;
        var size = 0;
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            console.log(amount, key, value);
            size += key.length + value.length;
            amount++;
        }
        console.log('Total entries:', amount);
        console.log('Total size:', size);
        if (fShowMaximumSize === true) {
            var maxSize = getMaximumSpace();
            console.log('Total size:', maxSize);
        }
    }
    LocalStorage.consoleInfo = consoleInfo;
})(LocalStorage || (LocalStorage = {}));
