"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Joke_1 = require("./Joke");
var VDM_1 = require("./VDM");
;
;
var Client = /** @class */ (function () {
    function Client(token, options) {
        if (!token)
            throw new SyntaxError("Invalid Token: Token must be a String");
        this.token = token;
        this.baseURL = options.baseURL || "https://blague.xyz/api";
        this.defaultLang = options.defaultLang || "fr";
    }
    /**
     * Make a call to the API
     * @param {string} path The path of the endpoint to call
     * @param {string} [lang] The lang to add to the request
     * @returns {Promise<APIResponse>}
    */
    Client.prototype._get = function (path, lang, type) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                lang = lang ? lang.toLowerCase() : this.defaultLang;
                url = this.baseURL + "/" + path + "?lang=" + lang;
                if (type)
                    url += "&type=" + type;
                axios_1.default.get(url, {
                    method: "get",
                    headers: { "Authorization": this.token }
                }).then(function (res) {
                    var data = res.data;
                    if (data.status === 200) {
                        resolve({ data: data, lang: lang });
                    }
                    else if (data.status === 401 && data.message === "Invalid token") {
                        reject("Invalid blague.xyz token.");
                    }
                    else if (data.status === 401 && data.message === "Premium endpoint") {
                        reject("You cannot use premium endpoints.");
                    }
                    else {
                        reject(data.message);
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Get a random joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    Client.prototype.randomJoke = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("joke/random", lang)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new Joke_1.Joke(this, res.data.joke, res.lang)];
                }
            });
        });
    };
    /**
     * Get the joke of the day
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    Client.prototype.dailyJoke = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("joke/day", lang)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new Joke_1.Joke(this, res.data.joke, res.lang)];
                }
            });
        });
    };
    /**
     * Get a joke with its ID
     * @param {number} id ID of the joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    Client.prototype.getJoke = function (id, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("joke/" + id, lang)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new Joke_1.Joke(this, res.data.joke, lang)];
                }
            });
        });
    };
    /**
     * Get the joke list
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    Client.prototype.listJoke = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("joke/list", lang)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.joke];
                }
            });
        });
    };
    /**
     * Get a random vdm
     * @param {string} [type] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<Joke>}
    */
    Client.prototype.randomVDM = function (type, lang) {
        if (type === void 0) { type = "normal"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("vdm/random", lang, type)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new VDM_1.VDM(this, res.data.vdm, res.lang)];
                }
            });
        });
    };
    /**
     * Get the vdm of the day
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    Client.prototype.dailyVDM = function (type, lang) {
        if (type === void 0) { type = "normal"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("vdm/day", lang, type)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new VDM_1.VDM(this, res.data.vdm, res.lang)];
                }
            });
        });
    };
    /**
     * Get a vdm with its ID
     * @param {number} id ID of the vdm
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    Client.prototype.getVDM = function (id, type, lang) {
        if (type === void 0) { type = "normal"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("vdm/" + id, lang, type)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, new VDM_1.VDM(this, res.data.vdm, lang)];
                }
            });
        });
    };
    /**
     * Get the vdm list
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    Client.prototype.listVDM = function (type, lang) {
        if (type === void 0) { type = "normal"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._get("vdm/list", lang, type)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.vdm];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
;
exports.default = Client;
