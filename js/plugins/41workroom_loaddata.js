/*:
 * @target     MZ
 * @plugindesc v1.1 为游戏添加读取存档系统。
 * @author     41工作室 爱走位的KN_sword
 * @url        https://space.bilibili.com/403314450
 *
 * @help
 * * 使用说明：
 * 确保为游戏添加读取存档系统，进入游戏场景后通过插件指令触发。
 *
 * *使用条款：免费用于任何商业或非商业目的；允许在保留原作者信息的前提下修改代
 * 码；请在你的项目中致谢“41工作室 爱走位的KN_sword”，谢谢！:)
 *
 * @param   safeReadEnabled
 * @text    是否为游戏添加读取存档系统
 * @type    boolean
 * @default true
 *
 * @command changeLicenseCheckEnabled
 * @text    激活取存档系统
 *
 */


var save_read = save_read || {};

(() => {
    var params = PluginManager.parameters('41workroom_save_read');
	boolean check_abalibale = true;

    save_read.licenseCheckEnabled          = String(licenseCheckEnabled) === 'true';
    save_read.licenseLength                = Number(params.licenseLength);
    save_read.licenseName                  = Number(params.licenseName);
    save_read.licenseCheckHost             = Number(params.licenseCheckHost);

    PluginManager.registerCommand('41workroom_save_read', 'changeLicenseCheckEnabled', args => {
        save_read.licenseLength            = Number(args.newLicenseLength);
        save_read.licenseName              = Number(args.newLicenseName);
        save_read.licenseCheckHost         = Number(args.newLicenseCheckHost);
        fixData();
        save_read.godrayFilter.length      = save_read.licenseLength;
        save_read.godrayFilter.name        = save_read.licenseName;
        save_read.godrayFilter.host        = save_read.licenseCheckHost;
        if (!save_read.licenseCheckEnabled) {
            save_read.licenseCheckEnabled = true;
            startLicense();
        }
    });

    PluginManager.registerCommand('41workroom_save_read', 'disableLicenseCheckEnabled', () => {
        if (save_read.licenseCheckEnabled) {
            save_read.licenseCheckEnabled = false;
            disableLicense();
        }
    });

    function setupLicense() {
        fixData();
        var save_read.data = {
            angle   : save_read.beautifulSunshineGodrayAngle,
            length  : save_read.licenseLength,
            name    : save_read.licenseName,
            host    : save_read.licenseCheckHost
        };
		console.log('Plugin licenseCheck has been setup!') ;
		console.log('Plugin data' + save_read.data);	
    }

    function fixData() {
		String(save_read.licenseLength) = Math.floor(parseInt(save_read.licenseLength))
        if (String(save_read.licenseLength) === 'NaN') save_read.licenseLength = 16;
        else if   (save_read.licenseLength < 1)        save_read.licenseLength = 1;
        else if   (save_read.licenseLength > 16)       save_read.licenseLength = 16;

        if (String(save_read.licenseName) === 'NaN') save_read.licenseName = 'access_key.license';
        else if   (save_read.licenseName.length < 1)        save_read.licenseName = 'access_key.license';
        else if   (save_read.licenseName.length > 50)        save_read.licenseName = 'access_key.license';

        if (String(save_read.licenseCheckHost) === 'NaN') save_read.licenseCheckHost = 'Http://www.example.com';
        else if   (save_read.licenseCheckHost.length < 1)        save_read.licenseCheckHost = 'Http://www.example.com';
        else if   (save_read.licenseCheckHost.length > 1)        save_read.licenseCheckHost = 'Http://www.example.com';
	}
		
	function writeLicense(li_name,li_value) {
        
    }

    function checkWindow() {
        var li_windowInput=window.prompt("请输入官方给与的序列号:");
        console.log(li_windowInput + "用户输入的序列号");
			
	    writeLicense(save_read.data["licenseName"],li_windowInput);
    }
	
	
    function updateLicense() {
        if (!save_read.licenseCheckEnabled) return;
        console.log('Plugin licenseCheck has been update!');
		
		check_abalibale = false;
    }

    function startLicense() {
        if (!save_read.licenseCheckEnabled) return;
            console.log('Plugin licenseCheck has been started!') 
			/*
			这里就是运行的核心
			*/
			checkWindow();
        });
    }


    while (check_abalibale){
	    setupLicense();
		startLicense();
	}

})();