globalThis.$localize=Object.assign(globalThis.$localize || {},{locale:"ru"});
"use strict";(function(global,_global$ng,_global$ng2,_global$ng2$common,_global$ng$common,_global$ng$common$loc){(_global$ng=global.ng)!==null&&_global$ng!==void 0?_global$ng:global.ng={};(_global$ng2$common=(_global$ng2=global.ng).common)!==null&&_global$ng2$common!==void 0?_global$ng2$common:_global$ng2.common={};(_global$ng$common$loc=(_global$ng$common=global.ng.common).locales)!==null&&_global$ng$common$loc!==void 0?_global$ng$common$loc:_global$ng$common.locales={};const u=undefined;function plural(val){const n=val,i=Math.floor(Math.abs(val)),v=val.toString().replace(/^[^.]*\.?/,"").length;if(v===0&&i%10===1&&!(i%100===11))return 1;if(v===0&&i%10===Math.floor(i%10)&&i%10>=2&&i%10<=4&&!(i%100>=12&&i%100<=14))return 3;if(v===0&&i%10===0||v===0&&i%10===Math.floor(i%10)&&i%10>=5&&i%10<=9||v===0&&i%100===Math.floor(i%100)&&i%100>=11&&i%100<=14)return 4;return 5}global.ng.common.locales["ru"]=["ru",[["AM","PM"],u,u],u,[["\u0412","\u041F","\u0412","\u0421","\u0427","\u041F","\u0421"],["\u0432\u0441","\u043F\u043D","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043F\u0442","\u0441\u0431"],["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435","\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A","\u0432\u0442\u043E\u0440\u043D\u0438\u043A","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0435\u0440\u0433","\u043F\u044F\u0442\u043D\u0438\u0446\u0430","\u0441\u0443\u0431\u0431\u043E\u0442\u0430"],["\u0432\u0441","\u043F\u043D","\u0432\u0442","\u0441\u0440","\u0447\u0442","\u043F\u0442","\u0441\u0431"]],u,[["\u042F","\u0424","\u041C","\u0410","\u041C","\u0418","\u0418","\u0410","\u0421","\u041E","\u041D","\u0414"],["\u044F\u043D\u0432.","\u0444\u0435\u0432\u0440.","\u043C\u0430\u0440.","\u0430\u043F\u0440.","\u043C\u0430\u044F","\u0438\u044E\u043D.","\u0438\u044E\u043B.","\u0430\u0432\u0433.","\u0441\u0435\u043D\u0442.","\u043E\u043A\u0442.","\u043D\u043E\u044F\u0431.","\u0434\u0435\u043A."],["\u044F\u043D\u0432\u0430\u0440\u044F","\u0444\u0435\u0432\u0440\u0430\u043B\u044F","\u043C\u0430\u0440\u0442\u0430","\u0430\u043F\u0440\u0435\u043B\u044F","\u043C\u0430\u044F","\u0438\u044E\u043D\u044F","\u0438\u044E\u043B\u044F","\u0430\u0432\u0433\u0443\u0441\u0442\u0430","\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F","\u043E\u043A\u0442\u044F\u0431\u0440\u044F","\u043D\u043E\u044F\u0431\u0440\u044F","\u0434\u0435\u043A\u0430\u0431\u0440\u044F"]],[["\u042F","\u0424","\u041C","\u0410","\u041C","\u0418","\u0418","\u0410","\u0421","\u041E","\u041D","\u0414"],["\u044F\u043D\u0432.","\u0444\u0435\u0432\u0440.","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440.","\u043C\u0430\u0439","\u0438\u044E\u043D\u044C","\u0438\u044E\u043B\u044C","\u0430\u0432\u0433.","\u0441\u0435\u043D\u0442.","\u043E\u043A\u0442.","\u043D\u043E\u044F\u0431.","\u0434\u0435\u043A."],["\u044F\u043D\u0432\u0430\u0440\u044C","\u0444\u0435\u0432\u0440\u0430\u043B\u044C","\u043C\u0430\u0440\u0442","\u0430\u043F\u0440\u0435\u043B\u044C","\u043C\u0430\u0439","\u0438\u044E\u043D\u044C","\u0438\u044E\u043B\u044C","\u0430\u0432\u0433\u0443\u0441\u0442","\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C","\u043E\u043A\u0442\u044F\u0431\u0440\u044C","\u043D\u043E\u044F\u0431\u0440\u044C","\u0434\u0435\u043A\u0430\u0431\u0440\u044C"]],[["\u0434\u043E \u043D.\u044D.","\u043D.\u044D."],["\u0434\u043E \u043D. \u044D.","\u043D. \u044D."],["\u0434\u043E \u0420\u043E\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043E\u0432\u0430","\u043E\u0442 \u0420\u043E\u0436\u0434\u0435\u0441\u0442\u0432\u0430 \u0425\u0440\u0438\u0441\u0442\u043E\u0432\u0430"]],1,[6,0],["dd.MM.y","d MMM y '\u0433'.","d MMMM y '\u0433'.","EEEE, d MMMM y '\u0433'."],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1}, {0}",u,u,u],[",","\xA0",";","%","+","-","E","\xD7","\u2030","\u221E","\u043D\u0435\xA0\u0447\u0438\u0441\u043B\u043E",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"RUB","\u20BD","\u0440\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u0438\u0439 \u0440\u0443\u0431\u043B\u044C",{"BYN":[u,"\u0440."],"GEL":[u,"\u10DA"],"PHP":[u,"\u20B1"],"RON":[u,"L"],"RUB":["\u20BD"],"RUR":["\u0440."],"THB":["\u0E3F"],"TMT":["\u0422\u041C\u0422"],"TWD":["NT$"],"UAH":["\u20B4"],"XXX":["XXXX"]},"ltr",plural,[[["\u043F\u043E\u043B\u043D.","\u043F\u043E\u043B\u0434.","\u0443\u0442\u0440\u0430","\u0434\u043D\u044F","\u0432\u0435\u0447.","\u043D\u043E\u0447\u0438"],["\u043F\u043E\u043B\u043D.","\u043F\u043E\u043B\u0434.","\u0443\u0442\u0440\u0430","\u0434\u043D\u044F","\u0432\u0435\u0447\u0435\u0440\u0430","\u043D\u043E\u0447\u0438"],["\u043F\u043E\u043B\u043D\u043E\u0447\u044C","\u043F\u043E\u043B\u0434\u0435\u043D\u044C","\u0443\u0442\u0440\u0430","\u0434\u043D\u044F","\u0432\u0435\u0447\u0435\u0440\u0430","\u043D\u043E\u0447\u0438"]],[["\u043F\u043E\u043B\u043D.","\u043F\u043E\u043B\u0434.","\u0443\u0442\u0440\u043E","\u0434\u0435\u043D\u044C","\u0432\u0435\u0447.","\u043D\u043E\u0447\u044C"],u,["\u043F\u043E\u043B\u043D\u043E\u0447\u044C","\u043F\u043E\u043B\u0434\u0435\u043D\u044C","\u0443\u0442\u0440\u043E","\u0434\u0435\u043D\u044C","\u0432\u0435\u0447\u0435\u0440","\u043D\u043E\u0447\u044C"]],["00:00","12:00",["04:00","12:00"],["12:00","18:00"],["18:00","22:00"],["22:00","04:00"]]]]})(globalThis);;
(self["webpackChunkcurrency_angular"] = self["webpackChunkcurrency_angular"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent),
/* harmony export */   MyErrorStateMatcher: () => (/* binding */ MyErrorStateMatcher)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 6623);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 8065);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8015);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1640);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 1856);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 5117);
/* harmony import */ var _services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/currencies.interface */ 8097);
/* harmony import */ var _services_currencies_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/currencies.service */ 7269);
/* harmony import */ var _modules_svg_icon_svg_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/svg-icon/svg-icon.component */ 6460);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 4136);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 6897);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 8913);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 9836);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-mask */ 2504);
/* harmony import */ var _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/loading/loading.component */ 8325);
/* harmony import */ var _ngrx_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngrx/component */ 6408);
















const _forTrack0 = ($index, $item) => $item.code;
function AppComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](1, 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function AppComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const currency_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", currency_r1.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](currency_r1.name);
  }
}
function AppComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](1, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function AppComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const currency_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", currency_r2.code);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](currency_r2.name);
  }
}
function AppComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](1, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
class MyErrorStateMatcher {
  isErrorState(control, form) {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
class AppComponent {
  #destroyRef;
  constructor(formBuilder, currenciesService) {
    this.formBuilder = formBuilder;
    this.currenciesService = currenciesService;
    this.isLoaded$ = this.currenciesService.isLoaded$;
    this.matcher = new MyErrorStateMatcher();
    this.currencies = [{
      name: '₽',
      code: _services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.RUB
    }, {
      name: '$',
      code: _services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.USD
    }, {
      name: '€',
      code: _services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.EUR
    }, {
      name: '£',
      code: _services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.GBP
    }];
    this.form = this.formBuilder.group({
      amountFrom: this.formBuilder.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]),
      currencyFrom: this.formBuilder.control(_services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.USD, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]),
      amountTo: this.formBuilder.control('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]),
      currencyTo: this.formBuilder.control(_services_currencies_interface__WEBPACK_IMPORTED_MODULE_0__.Pairs.RUB, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required])
    });
    this.#destroyRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_4__.DestroyRef);
  }
  ngOnInit() {
    this.loadCurrencyPairsRates();
  }
  ngAfterViewInit() {
    this.formListener();
  }
  formListener() {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([this.currenciesService.isLoaded$, this.form.get('amountFrom').valueChanges]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(([isLoaded]) => !isLoaded)).subscribe(([, amountFrom]) => {
      const amountTo = this.currenciesService.getAmount(amountFrom, this.form.value.currencyFrom, this.form.value.currencyTo);
      this.form.get('amountTo')?.setValue(amountTo, {
        emitEvent: false
      });
    });
    (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.combineLatest)([this.currenciesService.isLoaded$, this.form.get('amountTo').valueChanges]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(([isLoaded]) => !isLoaded)).subscribe(([, amountTo]) => {
      const amountFrom = this.currenciesService.getAmount(amountTo, this.form.value.currencyTo, this.form.value.currencyFrom);
      this.form.get('amountFrom')?.setValue(amountFrom, {
        emitEvent: false
      });
    });
  }
  loadCurrencyPairsRates() {
    this.currenciesService.loadCurrencyPairsRates(this.currencies.map(currency => currency.code)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.take)(1), (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.takeUntilDestroyed)(this.#destroyRef)).subscribe(data => {
      this.currenciesService.setCurrencyPairsRates(data);
    });
  }
  static #_ = this.ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.NonNullableFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_currencies_service__WEBPACK_IMPORTED_MODULE_1__.CurrenciesService));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    decls: 38,
    vars: 11,
    consts: () => {
      let i18n_0;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_loading_text$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_0 = goog.getMsg("Loading currency rates");
        i18n_0 = MSG_EXTERNAL_loading_text$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_0;
      } else {
        i18n_0 = "Loading currency rates";
      }
      let i18n_1;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_label_amount_from$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Amount");
        i18n_1 = MSG_EXTERNAL_form_form_field_label_amount_from$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_1;
      } else {
        i18n_1 = "Amount";
      }
      let i18n_2;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_label_currency_from$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_2 = goog.getMsg("Currency");
        i18n_2 = MSG_EXTERNAL_form_form_field_label_currency_from$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_2;
      } else {
        i18n_2 = "Currency";
      }
      let i18n_3;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_label_amoun_to$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_3 = goog.getMsg("Amount");
        i18n_3 = MSG_EXTERNAL_form_form_field_label_amoun_to$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_3;
      } else {
        i18n_3 = "Amount";
      }
      let i18n_4;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_error_required$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_4 = goog.getMsg("Required field");
        i18n_4 = MSG_EXTERNAL_form_form_field_error_required$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_4;
      } else {
        i18n_4 = "Required field";
      }
      let i18n_5;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_label_currency_to$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_5 = goog.getMsg("Currency");
        i18n_5 = MSG_EXTERNAL_form_form_field_label_currency_to$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_5;
      } else {
        i18n_5 = "Currency";
      }
      let i18n_6;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_github_link$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_6 = goog.getMsg("See code on github");
        i18n_6 = MSG_EXTERNAL_github_link$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_6;
      } else {
        i18n_6 = "See code on github";
      }
      let i18n_7;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_error_required$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_7 = goog.getMsg("Required field");
        i18n_7 = MSG_EXTERNAL_form_form_field_error_required$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_7;
      } else {
        i18n_7 = "Required field";
      }
      let i18n_8;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_error$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_8 = goog.getMsg("Must make a selection");
        i18n_8 = MSG_EXTERNAL_form_form_field_error$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_8;
      } else {
        i18n_8 = "Must make a selection";
      }
      let i18n_9;
      if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        /**
         * @suppress {msgDescriptions}
         */
        const MSG_EXTERNAL_form_form_field_error$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_9 = goog.getMsg("Must make a selection");
        i18n_9 = MSG_EXTERNAL_form_form_field_error$$_______________USERS_AKPOP10_DESKTOP_PROJECTS_CURRENCY_SRC_APP_APP_COMPONENT_TS_9;
      } else {
        i18n_9 = "Must make a selection";
      }
      return [i18n_0, i18n_1, i18n_2, i18n_3, i18n_4, i18n_5, i18n_6, i18n_7, i18n_8, i18n_9, [3, "isVisible"], [1, "form", 3, "formGroup"], [1, "form-group"], ["appearance", "outline", "floatLabel", "always", 1, "form-group__field"], ["formControlName", "amountFrom", "mask", "separator", "matInput", "", "type", "text", 3, "leadZero"], ["appearance", "outline", "floatLabel", "always", 1, "form-group__field", "form-group__field_short"], ["formControlName", "currencyFrom", 3, "errorStateMatcher"], ["type", "button", 1, "form__swap-btn"], ["name", "swap"], ["formControlName", "amountTo", "mask", "separator", "matInput", "", "type", "text", 3, "leadZero"], ["formControlName", "currencyTo", 3, "errorStateMatcher"], ["href", "https://github.com/ASDAlexey/ASDAlexey.github.io", "target", "_blank", 1, "github-link"], ["alt", "github", "height", "24", "property", "high", "src", "/assets/images/github.svg", "width", "24", 1, "github-link__img"], [1, "github-link__text"], [3, "value"]];
    },
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "app-loading", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](1, "ngrxPush");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](3, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "form", 11)(5, "div", 12)(6, "mat-form-field", 13)(7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](8, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, AppComponent_Conditional_10_Template, 2, 0, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "mat-form-field", 15)(12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](13, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-select", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeaterCreate"](15, AppComponent_For_16_Template, 2, 2, "mat-option", null, _forTrack0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, AppComponent_Conditional_17_Template, 2, 0, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "svg-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 12)(21, "mat-form-field", 13)(22, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](23, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](24, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](26, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "mat-form-field", 15)(28, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](29, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "mat-select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeaterCreate"](31, AppComponent_For_32_Template, 2, 2, "mat-option", null, _forTrack0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](33, AppComponent_Conditional_33_Template, 2, 0, "mat-error");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](35, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "span", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵi18n"](37, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_3_0;
        let tmp_6_0;
        let tmp_10_0;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("isVisible", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](1, 9, ctx.isLoaded$)) !== null && tmp_0_0 !== undefined ? tmp_0_0 : false);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("leadZero", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](10, ((tmp_3_0 = ctx.form.get("amountFrom")) == null ? null : tmp_3_0.hasError("required")) ? 10 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("errorStateMatcher", ctx.matcher);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeater"](ctx.currencies);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](17, ((tmp_6_0 = ctx.form.get("currencyFrom")) == null ? null : tmp_6_0.hasError("required")) ? 17 : -1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("leadZero", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("errorStateMatcher", ctx.matcher);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrepeater"](ctx.currencies);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](33, ((tmp_10_0 = ctx.form.get("currencyTo")) == null ? null : tmp_10_0.hasError("required")) ? 33 : -1);
      }
    },
    dependencies: [_modules_svg_icon_svg_icon_component__WEBPACK_IMPORTED_MODULE_2__.SvgIconComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, ngx_mask__WEBPACK_IMPORTED_MODULE_14__.NgxMaskDirective, _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_3__.LoadingComponent, _ngrx_component__WEBPACK_IMPORTED_MODULE_15__.PushPipe],
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n\n.form[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.form__swap-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 56px;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  width: 370px;\n  gap: 10px;\n}\n.form-group__field_short[_ngcontent-%COMP%] {\n  width: 170px;\n}\n\n.github-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 50px;\n  margin: 16px auto 0;\n  padding: 2px 18px 0;\n  gap: 12px;\n  border-radius: 8px;\n  background: var(--state-layers);\n  color: var(--sys-on-primary);\n  font-size: 16px;\n  cursor: pointer;\n  transition: var(--transition-time) all;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBQ0Y7QUFDRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFDSjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtBQUFGO0FBR0k7RUFDRSxZQUFBO0FBRE47O0FBTUE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtFQUNBLHNDQUFBO0FBSEYiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5mb3JtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMHB4O1xuXG4gICZfX3N3YXAtYnRuIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgd2lkdGg6IDQwcHg7XG4gICAgaGVpZ2h0OiA1NnB4O1xuICB9XG59XG5cbi5mb3JtLWdyb3VwIHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDM3MHB4O1xuICBnYXA6IDEwcHg7XG5cbiAgJl9fZmllbGQge1xuICAgICZfc2hvcnQge1xuICAgICAgd2lkdGg6IDE3MHB4O1xuICAgIH1cbiAgfVxufVxuXG4uZ2l0aHViLWxpbmsge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luOiAxNnB4IGF1dG8gMDtcbiAgcGFkZGluZzogMnB4IDE4cHggMDtcbiAgZ2FwOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN0YXRlLWxheWVycyk7XG4gIGNvbG9yOiB2YXIoLS1zeXMtb24tcHJpbWFyeSk7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB2YXIoLS10cmFuc2l0aW9uLXRpbWUpIGFsbDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/clipboard */ 39);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 9191);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 7008);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 8015);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 5912);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/select */ 8913);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/icon */ 3051);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 9836);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 4136);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ 6897);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 4199);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser/animations */ 1244);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 1099);
/* harmony import */ var _ngrx_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngrx/component */ 6408);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngrx/store-devtools */ 9094);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-mask */ 2504);
/* harmony import */ var primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dropdown */ 9928);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/loading/loading.component */ 8325);
/* harmony import */ var _interceptors_base_url_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interceptors/base-url.interceptor */ 1127);
/* harmony import */ var _modules_svg_icon_generated_svg_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/svg-icon/generated-svg/svg-icons */ 9285);
/* harmony import */ var _modules_svg_icon_svg_icon_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/svg-icon/svg-icon.module */ 1499);
/* harmony import */ var _modules_svg_icon_svg_icon_token__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/svg-icon/svg-icon.token */ 1786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 6623);

























class AppModule {
  static #_ = this.ɵfac = function AppModule_Factory(t) {
    return new (t || AppModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: AppModule,
    bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [{
      provide: _modules_svg_icon_svg_icon_token__WEBPACK_IMPORTED_MODULE_6__.SVG_REGISTRY_TOKEN,
      useValue: _modules_svg_icon_generated_svg_svg_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
    }, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HTTP_INTERCEPTORS,
      useClass: _interceptors_base_url_interceptor__WEBPACK_IMPORTED_MODULE_3__.BaseUrlInterceptor,
      multi: true
    }, (0,ngx_mask__WEBPACK_IMPORTED_MODULE_9__.provideNgxMask)()],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule, _modules_svg_icon_svg_icon_module__WEBPACK_IMPORTED_MODULE_5__.SvgIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__.ClipboardModule, _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production ? [] : _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_15__.StoreDevtoolsModule.instrument({
      maxAge: 300,
      connectInZone: true
    }), primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatOption, _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatFormFieldModule, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInputModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIcon]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_12__.BrowserAnimationsModule, _angular_router__WEBPACK_IMPORTED_MODULE_23__.RouterOutlet, _modules_svg_icon_svg_icon_module__WEBPACK_IMPORTED_MODULE_5__.SvgIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__.ClipboardModule, _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_15__.StoreDevtoolsModule, _ngrx_component__WEBPACK_IMPORTED_MODULE_24__.LetDirective, primeng_dropdown__WEBPACK_IMPORTED_MODULE_16__.DropdownModule, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatOption, _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_20__.MatFormFieldModule, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInputModule, ngx_mask__WEBPACK_IMPORTED_MODULE_9__.NgxMaskDirective, _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_2__.LoadingComponent, _ngrx_component__WEBPACK_IMPORTED_MODULE_24__.PushPipe, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIcon]
  });
})();

/***/ }),

/***/ 8325:
/*!*********************************************************!*\
  !*** ./src/app/components/loading/loading.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingComponent: () => (/* binding */ LoadingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6623);

const _c0 = ["*"];
function LoadingComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.link, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function LoadingComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 3);
  }
}
/**
 * Представляет компонент загрузки, который отображает предварительный загрузчик.
 */
class LoadingComponent {
  /**
   * Создает новый экземпляр конструктора.
   *
   * @param {string} type - Тип объекта. Это может быть 'animation' или 'image'.
   * @return {void}
   */
  constructor(type = 'animation') {
    this.type = type;
    /**
     * Указывает, видим ли в прелоадер или нет
     *
     * @type {boolean}
     */
    this.isVisible = false;
    /**
     * Проверяет являться ли указанный объект анимацией.
     *
     * @param {Object} object - Объект для проверки.
     * @returns {boolean} - Возвращает истину, если объект является анимацией, иначе ложь.
     */
    this.isAnimation = this.type !== 'image';
    /**
     * Получает значение ссылки от соответствующего метода.
     * @returns {string} Значение ссылки, полученное от метода.
     */
    this.link = this.getLink();
  }
  /**
   * Реагирует на изменения во входных свойствах компонента.
   *
   * @param {SimpleChangesTyped<this>} changes - Изменения во входных свойствах компонента.
   * @return {void} - Возвращает ничего.
   */
  ngOnChanges(changes) {
    if (changes.isVisible?.currentValue && this.type === 'image') {
      this.link = this.getLink();
    }
  }
  /**
   * Возвращает ссылку на изображение предзагрузчика с параметром cache buster.
   *
   * @returns {string} Ссылка на изображение предзагрузки с параметром -ant, преодолевающим кеширование.
   */
  getLink() {
    return `/assets/images/preloader.svg?cacheBuster=${new Date().getTime()}`;
  }
  static #_ = this.ɵfac = function LoadingComponent_Factory(t) {
    return new (t || LoadingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('type'));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: LoadingComponent,
    selectors: [["app-loading"]],
    hostVars: 4,
    hostBindings: function LoadingComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("visible", ctx.isVisible)("animation", ctx.isAnimation);
      }
    },
    inputs: {
      isVisible: "isVisible"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    ngContentSelectors: _c0,
    decls: 2,
    vars: 1,
    consts: [[1, "loader__img-block"], ["alt", "loader-image", 1, "loader__img", 3, "src"], [1, "loader__text"], [1, "loader__animation"]],
    template: function LoadingComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, LoadingComponent_Conditional_0_Template, 2, 1, "div", 0)(1, LoadingComponent_Conditional_1_Template, 3, 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](0, ctx.type === "image" ? 0 : 1);
      }
    },
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  z-index: 1000;\n  position: absolute;\n  top: 0;\n  left: 0;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  min-height: 20px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity var(--transition-time);\n}\n.animation[_nghost-%COMP%] {\n  background-color: var(--sys-surface);\n}\n.visible[_nghost-%COMP%] {\n  opacity: 1;\n  pointer-events: auto;\n}\n.static[_nghost-%COMP%] {\n  position: relative;\n  height: auto;\n}\n\n.loader__text[_ngcontent-%COMP%] {\n  z-index: 1;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: -24px;\n  transform: translate(-50%, -50%);\n  color: var(--sys-on-surface);\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 20px;\n  letter-spacing: 0.1px;\n}\n.loader__animation[_ngcontent-%COMP%] {\n  display: block;\n  width: 5px;\n  height: 5px;\n  margin-left: -200px;\n  border-radius: 50%;\n  color: var(--white);\n  animation: _ngcontent-%COMP%_shadow-rolling 2s linear infinite;\n  opacity: 0.8;\n}\n.loader__img-block[_ngcontent-%COMP%] {\n  z-index: 100;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: linear-gradient(180deg, rgb(18, 19, 22) 0%, rgb(44, 47, 53) 52%, rgb(59, 62, 71) 90%);\n  opacity: 1;\n  transition: opacity 0.5s;\n}\n.loader__img[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  width: 100%;\n  height: auto;\n  transform: translateY(-100%);\n}\n\n@keyframes _ngcontent-%COMP%_shadow-rolling {\n  0% {\n    box-shadow: 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0);\n  }\n  12% {\n    box-shadow: 100px 0 var(--white), 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0);\n  }\n  25% {\n    box-shadow: 110px 0 var(--white), 100px 0 var(--white), 0 0 hsl(var(--white-hsl)/0), 0 0 hsl(var(--white-hsl)/0);\n  }\n  36% {\n    box-shadow: 120px 0 var(--white), 110px 0 var(--white), 100px 0 var(--white), 0 0 hsl(var(--white-hsl)/0);\n  }\n  50% {\n    box-shadow: 130px 0 var(--white), 120px 0 var(--white), 110px 0 var(--white), 100px 0 var(--white);\n  }\n  62% {\n    box-shadow: 200px 0 hsl(var(--white-hsl)/0), 130px 0 var(--white), 120px 0 var(--white), 110px 0 var(--white);\n  }\n  75% {\n    box-shadow: 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0), 130px 0 var(--white), 120px 0 var(--white);\n  }\n  87% {\n    box-shadow: 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0), 130px 0 var(--white);\n  }\n  100% {\n    box-shadow: 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0), 200px 0 hsl(var(--white-hsl)/0);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXNzZXRzL3N0eWxlcy9fdHlwb2dyYXBoeS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0Esb0JBQUE7RUFDQSwwQ0FBQTtBQURGO0FBR0U7RUFDRSxvQ0FBQTtBQURKO0FBSUU7RUFDRSxVQUFBO0VBQ0Esb0JBQUE7QUFGSjtBQUtFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0FBSEo7O0FBUUU7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0NBQUE7RUFDQSw0QkFBQTtFQ3RCRixnQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0FEa0JGO0FBTUU7RUFDRSxjQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSw0Q0FBQTtFQUNBLFlBQUE7QUFKSjtBQU9FO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUdBQUE7RUFDQSxVQUFBO0VBQ0Esd0JBQUE7QUFMSjtBQVFFO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7QUFOSjs7QUFVQTtFQUNFO0lBQ0UsOEhBQ0U7RUFSSjtFQWNBO0lBQ0UsdUhBQ0U7RUFiSjtFQW1CQTtJQUNFLGdIQUNFO0VBbEJKO0VBd0JBO0lBQ0UseUdBQ0U7RUF2Qko7RUE2QkE7SUFDRSxrR0FDRTtFQTVCSjtFQWtDQTtJQUNFLDZHQUNFO0VBakNKO0VBdUNBO0lBQ0Usd0hBQ0U7RUF0Q0o7RUE0Q0E7SUFDRSxtSUFDRTtFQTNDSjtFQWlEQTtJQUNFLDhJQUNFO0VBaERKO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICd0eXBvZ3JhcGh5JztcblxuOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICB6LWluZGV4OiAxMDAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDIwcHg7XG4gIG9wYWNpdHk6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IHZhcigtLXRyYW5zaXRpb24tdGltZSk7XG5cbiAgJi5hbmltYXRpb24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN5cy1zdXJmYWNlKTtcbiAgfVxuXG4gICYudmlzaWJsZSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgfVxuXG4gICYuc3RhdGljIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG59XG5cbi5sb2FkZXIge1xuICAmX190ZXh0IHtcbiAgICB6LWluZGV4OiAxO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWFyZ2luLXRvcDogLTI0cHg7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgY29sb3I6IHZhcigtLXN5cy1vbi1zdXJmYWNlKTtcblxuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkudGV4dCgndGl0bGUnLCAnc21hbGwnKTtcbiAgfVxuXG4gICZfX2FuaW1hdGlvbiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDVweDtcbiAgICBoZWlnaHQ6IDVweDtcbiAgICBtYXJnaW4tbGVmdDogLTIwMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xuICAgIGFuaW1hdGlvbjogc2hhZG93LXJvbGxpbmcgMnMgbGluZWFyIGluZmluaXRlO1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxuXG4gICZfX2ltZy1ibG9jayB7XG4gICAgei1pbmRleDogMTAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2IoMTgsIDE5LCAyMikgMCUsIHJnYig0NCwgNDcsIDUzKSA1MiUsIHJnYig1OSwgNjIsIDcxKSA5MCUpO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzO1xuICB9XG5cbiAgJl9faW1nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMDAlO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzaGFkb3ctcm9sbGluZyB7XG4gIDAlIHtcbiAgICBib3gtc2hhZG93OlxuICAgICAgMCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAwIDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKSxcbiAgICAgIDAgMCBoc2wodmFyKC0td2hpdGUtaHNsKSAvIDApLFxuICAgICAgMCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCk7XG4gIH1cblxuICAxMiUge1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAxMDBweCAwIHZhcigtLXdoaXRlKSxcbiAgICAgIDAgMCBoc2wodmFyKC0td2hpdGUtaHNsKSAvIDApLFxuICAgICAgMCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAwIDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKTtcbiAgfVxuXG4gIDI1JSB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgIDExMHB4IDAgdmFyKC0td2hpdGUpLFxuICAgICAgMTAwcHggMCB2YXIoLS13aGl0ZSksXG4gICAgICAwIDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKSxcbiAgICAgIDAgMCBoc2wodmFyKC0td2hpdGUtaHNsKSAvIDApO1xuICB9XG5cbiAgMzYlIHtcbiAgICBib3gtc2hhZG93OlxuICAgICAgMTIwcHggMCB2YXIoLS13aGl0ZSksXG4gICAgICAxMTBweCAwIHZhcigtLXdoaXRlKSxcbiAgICAgIDEwMHB4IDAgdmFyKC0td2hpdGUpLFxuICAgICAgMCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCk7XG4gIH1cblxuICA1MCUge1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAxMzBweCAwIHZhcigtLXdoaXRlKSxcbiAgICAgIDEyMHB4IDAgdmFyKC0td2hpdGUpLFxuICAgICAgMTEwcHggMCB2YXIoLS13aGl0ZSksXG4gICAgICAxMDBweCAwIHZhcigtLXdoaXRlKTtcbiAgfVxuXG4gIDYyJSB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgIDIwMHB4IDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKSxcbiAgICAgIDEzMHB4IDAgdmFyKC0td2hpdGUpLFxuICAgICAgMTIwcHggMCB2YXIoLS13aGl0ZSksXG4gICAgICAxMTBweCAwIHZhcigtLXdoaXRlKTtcbiAgfVxuXG4gIDc1JSB7XG4gICAgYm94LXNoYWRvdzpcbiAgICAgIDIwMHB4IDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKSxcbiAgICAgIDIwMHB4IDAgaHNsKHZhcigtLXdoaXRlLWhzbCkgLyAwKSxcbiAgICAgIDEzMHB4IDAgdmFyKC0td2hpdGUpLFxuICAgICAgMTIwcHggMCB2YXIoLS13aGl0ZSk7XG4gIH1cblxuICA4NyUge1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAxMzBweCAwIHZhcigtLXdoaXRlKTtcbiAgfVxuXG4gIDEwMCUge1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCksXG4gICAgICAyMDBweCAwIGhzbCh2YXIoLS13aGl0ZS1oc2wpIC8gMCk7XG4gIH1cbn1cbiIsIi8vIE0zL3RpdGxlL2xhcmdlXG5AbWl4aW4gdGl0bGUtbGFyZ2Uge1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDIycHg7XG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuLy8gTTMvdGl0bGUvbWVkaXVtXG5AbWl4aW4gdGl0bGUtbWVkaXVtIHtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTVweDtcbn1cblxuLy8gTTMvdGl0bGUvc21hbGxcbkBtaXhpbiB0aXRsZS1zbWFsbCB7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjFweDtcbn1cblxuLy8gTTMvYm9keS9sYXJnZTtcbkBtaXhpbiBib2R5LWxhcmdlIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xufVxuXG4vLyBNMy9ib2R5L21lZGl1bVxuQG1peGluIGJvZHktbWVkaXVtIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMjBweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMjVweDtcbn1cblxuLy8gTTMvYm9keS9zbWFsbFxuQG1peGluIGJvZHktc21hbGwge1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuLy8gTTMvaGVhZGxpbmUvbGFyZ2VcbkBtaXhpbiBoZWFkbGluZS1sYXJnZSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBsaW5lLWhlaWdodDogNDBweDtcbn1cblxuLy8gTTMvbGFiZWwvc21hbGxcbkBtaXhpbiBsYWJlbC1zbWFsbCB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xufVxuXG5AbWl4aW4gdGV4dCgkdHlwZSwgJHNpemUpIHtcbiAgQGlmICR0eXBlID09ICd0aXRsZScge1xuICAgIEBpZiAkc2l6ZSA9PSAnbGFyZ2UnIHtcbiAgICAgIEBpbmNsdWRlIHRpdGxlLWxhcmdlO1xuICAgIH1cblxuICAgIEBpZiAkc2l6ZSA9PSAnbWVkaXVtJyB7XG4gICAgICBAaW5jbHVkZSB0aXRsZS1tZWRpdW07XG4gICAgfVxuXG4gICAgQGlmICRzaXplID09ICdzbWFsbCcge1xuICAgICAgQGluY2x1ZGUgdGl0bGUtc21hbGw7XG4gICAgfVxuICB9XG5cbiAgQGlmICR0eXBlID09ICdib2R5JyB7XG4gICAgQGlmICRzaXplID09ICdsYXJnZScge1xuICAgICAgQGluY2x1ZGUgYm9keS1sYXJnZTtcbiAgICB9XG5cbiAgICBAaWYgJHNpemUgPT0gJ21lZGl1bScge1xuICAgICAgQGluY2x1ZGUgYm9keS1tZWRpdW07XG4gICAgfVxuXG4gICAgQGlmICRzaXplID09ICdzbWFsbCcge1xuICAgICAgQGluY2x1ZGUgYm9keS1zbWFsbDtcbiAgICB9XG4gIH1cblxuICBAaWYgJHR5cGUgPT0gJ2hlYWRsaW5lJyB7XG4gICAgQGlmICRzaXplID09ICdsYXJnZScge1xuICAgICAgQGluY2x1ZGUgaGVhZGxpbmUtbGFyZ2U7XG4gICAgfVxuICB9XG5cbiAgQGlmICR0eXBlID09ICdsYWJlbCcge1xuICAgIEBpZiAkc2l6ZSA9PSAnc21hbGwnIHtcbiAgICAgIEBpbmNsdWRlIGxhYmVsLXNtYWxsO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 1127:
/*!******************************************************!*\
  !*** ./src/app/interceptors/base-url.interceptor.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseUrlInterceptor: () => (/* binding */ BaseUrlInterceptor)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6623);



/**
 * Перехватывает HTTP-запросы и добавляет базовый URL-API, если URL-запроса не начинается с '/'
 * @class BaseUrlInterceptor
 * @implements {HttpInterceptor}
 * @Injectable({ providedIn: 'root' })
 */
class BaseUrlInterceptor {
  /**
   * Перехватывает HTTP-запросы и добавляет базовый URL API, если URL-запроса не начинается с '/'
   * @param {HttpRequest<unknown>} req - HTTP-запрос для перехвата
   * @param {HttpHandler} next - Следующий обработчик HTTP в цепочке перехватов
   * @returns {Observable<HttpEvent<unknown>>} - Наблюдаемый объект, который отдаёт HTTP-ответ
   */
  intercept(req, next) {
    req = req.clone({
      url: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.API_URL + req.url
    });
    return next.handle(req);
  }
  static #_ = this.ɵfac = function BaseUrlInterceptor_Factory(t) {
    return new (t || BaseUrlInterceptor)();
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: BaseUrlInterceptor,
    factory: BaseUrlInterceptor.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9285:
/*!*************************************************************!*\
  !*** ./src/app/modules/svg-icon/generated-svg/svg-icons.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* 🤖 this file was generated by svg-to-ts */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  swap: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.8.603a.5.5 0 00-.8.4v2H1a1 1 0 100 2h10v2a.5.5 0 00.8.4l3.997-3a.5.5 0 000-.8l-3.997-3zM5 13.003v2a.5.5 0 01-.8.4l-3.997-3a.5.5 0 010-.8l3.997-3a.5.5 0 01.8.4v2h10a1 1 0 010 2H5z"/></svg>'
});

/***/ }),

/***/ 6460:
/*!********************************************************!*\
  !*** ./src/app/modules/svg-icon/svg-icon.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgIconComponent: () => (/* binding */ SvgIconComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 6623);
/* harmony import */ var _svg_icon_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg-icon.service */ 4324);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 4199);






/**
 * Класс SvgIconComponent представляет компонент иконки SVG.
 * Данный компонент позволяет отображать иконки SVG с настраиваемыми свойствами, такими как цвет и вращение.
 * Он использует SvgIconService для получения иконок SVG и применения их к элементу-хосту компонента.
 */
class SvgIconComponent {
  /**
   * Создает новый экземпляр конструктора.
   *
   * @param {ElementRef} host - Объект ElementRef, представляющий хост-элемент.
   * @param {SvgIconService} registry - Объект SvgIconService используется для регистрации иконок SVG.
   * @param {DomSanitizer} sanitizer - Объект DomSanitizer используется для санитарной обработки HTML-контента.
   * @param {Renderer2} renderer - Объект Renderer2 используется для манипуляции с DOM-элементами.
   */
  constructor(host, registry, sanitizer, renderer) {
    this.host = host;
    this.registry = registry;
    this.sanitizer = sanitizer;
    this.renderer = renderer;
    /**
     * Переменная color представляет цвет объекта или элемента.
     *
     * @type {string}
     */
    this.color = '';
    /**
     * Количество вращения в градусах.
     *
     * @type {number}
     */
    this.rotateDeg = 0;
    /**
     * Представляет коллекцию названий CSS-классов.
     * @class
     */
    this.classes = 'svg-icon';
    /**
     * Представляет последнее значение ключа.
     *
     * @type {string}
     */
    this.lastKey = '';
    /**
     * Представляет сырой нативный элемент текущего компонента.
     *
     * @type {ElementRef}
     * @readonly
     */
    this.element = this.host.nativeElement;
  }
  /**
   * Выполнить необходимые действия, когда входные свойства изменились.
   *
   * @param {SimpleChangesTyped<this>} changes - Массив изменений.
   *
   * @return {void}
   */
  ngOnChanges(changes) {
    if (changes?.name && this.name) {
      this.setIcon(this.name);
    }
    changes?.color && this.setInputColor(changes?.color.currentValue);
  }
  /**
   * Устанавливает входной цвет для элемента.
   *
   * @param {string} color - Цвет, который нужно установить для элемента.
   * @return {void}
   */
  setInputColor(color) {
    color && (this.element.style.fill = this.color);
  }
  /**
   * Устанавливает иконку для компонента.
   *
   * @param {IconType} name - Название иконки.
   * @returns {void}
   */
  setIcon(name) {
    const icon = this.registry.getIcon(name);
    if (!icon) {
      console.error('Иконка не найдена ' + name);
      return;
    }
    this.renderer.removeClass(this.element, SvgIconComponent.getIconClassName(this.lastKey));
    this.lastKey = name;
    this.renderer.addClass(this.element, SvgIconComponent.getIconClassName(name));
    if (this.rotateDeg) {
      this.renderer.setStyle(this.element, 'transform', `rotate(${this.rotateDeg}deg)`);
    }
    this.name && this.renderer.setAttribute(this.element, 'data-svg-icon', this.name);
    const sanitizedHtml = this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_1__.SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(icon));
    this.renderer.setProperty(this.element, 'innerHTML', sanitizedHtml);
  }
  /**
   * Возвращает имя класса для SVG иконки на основе указанного имени.
   *
   * @param {string} name - Имя SVG иконки.
   *
   * @return {string} Имя класса для SVG иконки.
   */
  static getIconClassName(name) {
    return `svg-icon-${name}`;
  }
  static #_ = this.ɵfac = function SvgIconComponent_Factory(t) {
    return new (t || SvgIconComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_svg_icon_service__WEBPACK_IMPORTED_MODULE_0__.SvgIconService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2));
  };
  static #_2 = this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: SvgIconComponent,
    selectors: [["svg-icon"]],
    hostVars: 2,
    hostBindings: function SvgIconComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.classes);
      }
    },
    inputs: {
      name: "name",
      color: "color",
      rotateDeg: "rotateDeg"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
    decls: 0,
    vars: 0,
    template: function SvgIconComponent_Template(rf, ctx) {},
    styles: ["[_nghost-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  fill: var(--sys-on-surface-variant);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbW9kdWxlcy9zdmctaWNvbi9zdmctaWNvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQ0FBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgZmlsbDogdmFyKC0tc3lzLW9uLXN1cmZhY2UtdmFyaWFudCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    changeDetection: 0
  });
}

/***/ }),

/***/ 9380:
/*!********************************************************!*\
  !*** ./src/app/modules/svg-icon/svg-icon.interface.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgIcon: () => (/* binding */ SvgIcon)
/* harmony export */ });
class SvgIcon {
  constructor(content) {
    this.content = content;
    this.isInitialized = false;
  }
}

/***/ }),

/***/ 1499:
/*!*****************************************************!*\
  !*** ./src/app/modules/svg-icon/svg-icon.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgIconModule: () => (/* binding */ SvgIconModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 9191);
/* harmony import */ var _svg_icon_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svg-icon.component */ 6460);
/* harmony import */ var _svg_icon_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg-icon.service */ 4324);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 6623);




/**
 * Представляет модуль для импорта и экспорта SVG-иконок.
 *
 * @module SvgIconModule
 * @use CommonModule
 * @declaration SvgIconComponent
 * @export SvgIconComponent
 * @provider SvgIconService
 */
class SvgIconModule {
  static #_ = this.ɵfac = function SvgIconModule_Factory(t) {
    return new (t || SvgIconModule)();
  };
  static #_2 = this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
    type: SvgIconModule
  });
  static #_3 = this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
    providers: [_svg_icon_service__WEBPACK_IMPORTED_MODULE_1__.SvgIconService],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
  });
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SvgIconModule, {
    declarations: [_svg_icon_component__WEBPACK_IMPORTED_MODULE_0__.SvgIconComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    exports: [_svg_icon_component__WEBPACK_IMPORTED_MODULE_0__.SvgIconComponent]
  });
})();

/***/ }),

/***/ 4324:
/*!******************************************************!*\
  !*** ./src/app/modules/svg-icon/svg-icon.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SvgIconService: () => (/* binding */ SvgIconService)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 9191);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 6623);
/* harmony import */ var _generated_svg_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generated-svg/svg-icons */ 9285);
/* harmony import */ var _svg_icon_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svg-icon.interface */ 9380);
/* harmony import */ var _svg_icon_token__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svg-icon.token */ 1786);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 4199);








/**
 * Преобразует массив с именем и данными в объект.
 * @param {Array} name - Строка с именем.
 * @param {Array} data - Строка с данными.
 * @returns {Object} - Объект с собственностями имени и данных.
 */
const objConverting = ([name, data]) => ({
  name,
  data
});
/**
 * Преобразует объект иконок в массив объектов иконок.
 *
 * @param {Object} obj - Объект, содержащий иконки.
 * @returns {Array} Массив объектов иконок, где каждый объект имеет свойства имени и данных.
 */
const iconsToArray = obj => Object.entries(obj).map(objConverting);
/**
 * Служба для управления иконками SVG.
 */
class SvgIconService {
  /**
   * Конструктор для класса.
   *
   * @constructor
   * @param {Document} document - Документ для манипулирования DOM.
   * @param {Record<string, string>} iconsRegistry - Реестр, содержащий иконки SVG.
   * @param {DomSanitizer} sanitizer - Объект-санитайзер для очистки HTML контента.
   * @returns {void}
   */
  constructor(document, iconsRegistry, sanitizer) {
    this.document = document;
    this.iconsRegistry = iconsRegistry;
    this.sanitizer = sanitizer;
    /**
     * Класс представляющий карту SVG.
     * @class
     */
    this.svgMap = new Map();
    const inMemoryIcons = this.iconsRegistry ?? _generated_svg_svg_icons__WEBPACK_IMPORTED_MODULE_0__["default"];
    if (inMemoryIcons) {
      this.register(iconsToArray(inMemoryIcons));
    }
  }
  /**
   * Извлекает содержимое SVG для заданного ключа иконки.
   *
   * @param {IconType} key - Ключ, представляющий иконку для извлечения.
   * @return {string | undefined} - Содержимое SVG иконки или undefined, если иконка не найдена.
   */
  getIcon(key) {
    const icon = key && this.svgMap.get(key);
    if (!icon) {
      return undefined;
    }
    if (!icon.isInitialized) {
      const svg = this.toElement(icon.content);
      icon.content = svg.outerHTML;
      icon.isInitialized = true;
    }
    return icon.content;
  }
  /**
   * Регистрирует одну или несколько иконок SvgIcon.
   *
   * @param {SvgIconType|SvgIconType[]} icons - Иконка SvgIcon для регистрации.
   * @returns {void}
   */
  register(icons) {
    for (const {
      name,
      data
    } of Array.isArray(icons) ? icons : [icons]) {
      if (!this.svgMap.has(name)) {
        this.svgMap.set(name, new _svg_icon_interface__WEBPACK_IMPORTED_MODULE_1__.SvgIcon(data));
      }
    }
  }
  /**
   * Преобразует заданную строку содержимого в SVGElement.
   *
   * @param {string} content - Строка содержимого для преобразования в SVGElement.
   * @returns {SVGElement} - Преобразованный SVGElement.
   */
  toElement(content) {
    const div = this.document.createElement('div');
    div.innerHTML = this.sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_3__.SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(content)) ?? '';
    return div.querySelector('svg');
  }
  static #_ = this.ɵfac = function SvgIconService_Factory(t) {
    return new (t || SvgIconService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_svg_icon_token__WEBPACK_IMPORTED_MODULE_2__.SVG_REGISTRY_TOKEN), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: SvgIconService,
    factory: SvgIconService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 1786:
/*!****************************************************!*\
  !*** ./src/app/modules/svg-icon/svg-icon.token.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVG_REGISTRY_TOKEN: () => (/* binding */ SVG_REGISTRY_TOKEN)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 6623);

const SVG_REGISTRY_TOKEN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('Icons registry token');

/***/ }),

/***/ 8097:
/*!**************************************************!*\
  !*** ./src/app/services/currencies.interface.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pairs: () => (/* binding */ Pairs)
/* harmony export */ });
var Pairs;
(function (Pairs) {
  Pairs["USD"] = "USD";
  Pairs["EUR"] = "EUR";
  Pairs["GBP"] = "GBP";
  Pairs["RUB"] = "RUB";
})(Pairs || (Pairs = {}));

/***/ }),

/***/ 7269:
/*!************************************************!*\
  !*** ./src/app/services/currencies.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CurrenciesService: () => (/* binding */ CurrenciesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 5536);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3901);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1969);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 4406);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _currencies_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currencies.interface */ 8097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 6623);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ 7008);







class CurrenciesService {
  #currencyPairsRates;
  constructor(http) {
    this.http = http;
    this.isLoaded$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(true);
    this.#currencyPairsRates = null;
  }
  loadCurrencyPairsRates(pairs) {
    this.isLoaded$.next(true);
    const data = this.getFromStorage();
    if (data) {
      const diffInSec = (Date.now() - data.date) / 1000;
      return (diffInSec > 3600 ? this.loadCurrencyPairsRatesFromAPI(pairs) : (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(data)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.isLoaded$.next(false)));
    } else {
      return this.loadCurrencyPairsRatesFromAPI(pairs).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => this.isLoaded$.next(false)));
    }
  }
  setCurrencyPairsRates(data) {
    this.#currencyPairsRates = data;
  }
  getAmount(amount, from, to) {
    if (!this.#currencyPairsRates?.rates[from] || !this.#currencyPairsRates?.rates[to] || amount === '') {
      return '';
    }
    if (from !== _currencies_interface__WEBPACK_IMPORTED_MODULE_1__.Pairs.USD) {
      const inDollars = +amount / this.#currencyPairsRates.rates[from];
      return `${inDollars * this.#currencyPairsRates.rates[to] || ''}`;
    } else {
      return `${+amount * this.#currencyPairsRates.rates[to] || ''}`;
    }
  }
  loadCurrencyPairsRatesFromAPI(pairs) {
    return this.http.get('latest', {
      params: {
        apikey: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.CURRENCY_FREAKS_API_KEY
      }
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(data => {
      const rates = pairs.reduce((acc, pair) => ({
        ...acc,
        [pair]: data.rates[pair]
      }), {});
      const currencyPairsRates = {
        ...data,
        rates,
        date: Date.now()
      };
      this.saveCurrencyPairsRatesToStorage(currencyPairsRates);
      return currencyPairsRates;
    }));
  }
  saveCurrencyPairsRatesToStorage(currencyPairsRates) {
    localStorage.setItem('currencyPairsRates', JSON.stringify(currencyPairsRates));
  }
  getFromStorage() {
    const currencyPairsRates = localStorage.getItem('currencyPairsRates');
    if (currencyPairsRates) {
      return JSON.parse(currencyPairsRates);
    } else {
      return null;
    }
  }
  static #_ = this.ɵfac = function CurrenciesService_Factory(t) {
    return new (t || CurrenciesService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_7__.HttpClient));
  };
  static #_2 = this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: CurrenciesService,
    factory: CurrenciesService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  environment: 'development',
  API_URL: 'https://api.currencyfreaks.com/',
  CURRENCY_FREAKS_API_KEY: 'b51102e92b9c4d10a5f3761598b2c9ba'
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 4199);
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/localize/init */ 2147);
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_localize_init__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 635);



_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 2147:
/*!****************************************!*\
  !*** @angular/localize/init (ignored) ***!
  \****************************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map