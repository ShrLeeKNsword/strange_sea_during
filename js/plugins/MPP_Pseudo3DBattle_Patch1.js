//=============================================================================
// MPP_Pseudo3DBattle_Patch1.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc Allows the movement of the battle camera to be prohibited from the option.
 * @author Mokusei Penguin
 * @url
 * 
 * @base MPP_Pseudo3DBattle
 * @orderAfter MPP_Pseudo3DBattle
 *
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * This plugin is a modification plugin for MPP_Pseudo3DBattle Ver.1.3.0.
 * Operation is not guaranteed for other versions.
 * There are no plans to support future version upgrades.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Camera Move Command Name
 *      @desc If it is empty, it will not be displayed on the options screen.
 *      @default Battle Camera Move
 * 
 *  @param Default Camera Move
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 */

/*:
 * @target MZ
 * @plugindesc 允许从选项中禁止战斗视角移动。
 * @author 木星ペンギン
 * @url
 * 
 * @base MPP_Pseudo3DBattle
 * @orderAfter MPP_Pseudo3DBattle
 *
 * @help [version 1.1.0]
 * 此插件适用于 RPG Maker MZ。
 * 
 * 该插件是 MPP_Pseudo3DBattle Ver.1.3.0 的修改插件
 * 不保证其他版本的操作。
 * 没有计划支持未来的版本升级。 
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Camera Move Command Name
 *      @text 视角移动命令名称
 *      @desc 如果为空，则不显示在选项画面中。
 *      @default 战斗视角移动
 * 
 *  @param Default Camera Move
 *      @text 视角移动默认值
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_Pseudo3DBattle_Patch1';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_CameraMoveCommandName = parameters['Camera Move Command Name'] || '';
    const param_DefaultCameraMove = parameters['Default Camera Move'] === 'true';
    
    //-------------------------------------------------------------------------
    // ConfigManager

    const configName = 'pseudo3dBattleCameraMove';

    ConfigManager[configName] = param_DefaultCameraMove;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.apply(this, arguments);
        if (typeof this[configName] === 'boolean') {
            config[configName] = this[configName];
        }
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (param_CameraMoveCommandName) {
            this[configName] = this.readFlag(config, configName, param_DefaultCameraMove);
        }
    };

    //-------------------------------------------------------------------------
    // BattleManager

    BattleManager._pseudo3dForcedCallMethods = [
        'setup',
        'startBattle',
        'home',
        'focus',
        'endAction',
        'driftOn',
        'driftOff',
    ];

    BattleManager.isPseudo3dMethodCallable = function(methodName) {
        return (
            ConfigManager[configName] ||
            this._pseudo3dForcedCallMethods.includes(methodName)
        );
    };
    
    const _BattleManager_callPseudo3dMethod = BattleManager.callPseudo3dMethod;
    BattleManager.callPseudo3dMethod = function(methodName) {
        if (this.isPseudo3dMethodCallable(methodName)) {
            _BattleManager_callPseudo3dMethod.apply(this, arguments);
        }
    };
    
    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.apply(this, arguments);
        if (!this.isPseudo3dMethodCallable('victory')) {
            this.callPseudo3dMethod('driftOff');
        }
    };
    
    //-------------------------------------------------------------------------
    // Window_Options

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        if (param_CameraMoveCommandName) {
            this.addCommand(param_CameraMoveCommandName, configName);
        }
    };

})();
