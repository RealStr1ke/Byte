"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var VDM = /** @class */ (function () {
    function VDM(client, data, lang) {
        this.client = client;
        this.content = data.content;
        this.id = data.id;
        this.lang = lang;
    }
    /**
     * Returns the vdm content instead of a VDM instance.
     * @returns {string} The formatted vdm.
     */
    VDM.prototype.toString = function () {
        return this.content;
    };
    /**
     * Returns the vdm text using Discord spoilers instead of a VDM instance.
     * @returns {string}
     */
    VDM.prototype.toDiscordSpoils = function () {
        return "||" + this.content + "||";
    };
    return VDM;
}());
exports.VDM = VDM;
;
