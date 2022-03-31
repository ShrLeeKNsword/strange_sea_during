/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook.js
 * 
 * Copyright (C) 2021 NUUN
 *该软件是在 MIT 许可下发布的。
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc 怪物图鉴
 * @author NUUN 汉化：硕明云书
 * @version 2.11.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 实现怪物图鉴。
 * 通过本插件，您可以自由设置怪物信息的显示内容。
 *
 * 敌人信息：可以查看当前出现的敌人信息。
 * 分析：显示指定敌人的信息。
 *
 * 战斗中可以打开队伍指令或怪物图鉴。
 * 使用分析功能时，TPB 战斗设计为在 TPB 计量表打开时停止。
 *
 * NUUN_RadarChartBase 是显示雷达图所必需的。
 * 
 * 
 * 敌人角色备忘录字段
 * <[tag]:[text]> 描述字段中的文本
 * [tag]:描述字段 tag name 描述怪物描述的标签如果是默认设置，则设置为 desc。
 * [text]:要显示的文本。
 * <desc:例子> 
 * 默认情况下，第 4 页显示的项目设置为 desc，因此输入 <desc: [text]> 以显示文本。
 * [img]:画像パス(拡張子なし)　
 * 個別指定画像フォルダが'pictures'ならimg/pictures直下のファイルを拡張子なしで記入してください。
 * サブフォルダーから取得する場合はサブフォルダー名も記入してください。例 items/tankobu
 * [x]:x座標(相対)
 * [y]:y座標(相対)
 * 複数画像を指定したい場合は項目リストで表示する分だけ設定し、記述欄、個別指定画像タグ名で別々の名前で設定してください。
 * デフォルトの設定ではpicturesフォルダーが指定されています。
 * モンスター個別画像はモンスター毎に異なる任意の画像を表示させるための機能です。モンスター画像を表示させる場合はモンスター画像で表示させてください。
 * 
 * <NoBook>
 * 它没有出现在怪物图画书中。 您只能查看数据以进行分析。
 * <NoBookData>
 * 它不会出现在怪物百科中，即使你使用分析也不会出现。
 * <ShowDataBook>
 * 即使没有被打败，也会被判定为失败。 此外，显示所有信息。
 * <AnalyzeResist:50> 设置分析的电阻值。 在这种情况下，分析成功的可能性为 50%。
 * <EnemyIcon:[iconid]>
 * モンスター名の左にアイコンを表示させることが出来ます。
 * <EnemyIcon:120> アイコンID120番のアイコンが表示されます。
 * <NoTransformInData> 変身時に撃破扱いに図鑑に登録しません。（変身前撃破をONにしている時のみ）
 * 
 * 
 * <EB_SVBattler:[fileName]> モンスター画像をサイドビュー画像で表示させます。(モンスターにサイドビューアクターを表示する系のプラグイン導入が前提としています)
 * [fileName]:ファイル名　サイドビューバトラー画像を指定します。sv_actorsフォルダ内のファイル名を拡張子なしで指定してください。
 * <EB_SVBattlerMotion:[motionId]> 指定したモーションで表示させます。記入なしの場合は0のモーションで表示されます。
 * [motionId]:0～17モーションID(数値で入力)
 * 
 * <EnemyBookCharacter:[failName],[id],[direction]> キャラチップを表示します。指定していないモンスターには表示されません。
 * [failName]:ファイル名　charactersフォルダ内のファイル名を拡張子なしで指定してください。
 * [id]:キャラチップのインデックス番号。3×4のキャラチップは0になります。
 * [direction]:方向を指定します。2正面（一番上） 4左（２番目） 6右（３番目） 8後向き（一番下）　※省略可能
 * 
 * 
 * スキル、アイテムのメモ欄
 * <AnalyzeSkill:[id]> アナライズを発動します。
 * [id]:アナライズスキル設定のリスト番号
 * <AnalyzeSkill:1> このスキル、アイテムはアナライズスキルとし、「アナライズスキル設定」の１番の設定で発動します。
 * 
 * <CertainAnalyze> アナライズ耐性を無視します。
 * 
 * <EnemyInfo> 敵の情報を表示します。
 * 
* 项目备注字段
 * <NoDropProbability>
 * 带有此标签的物品不会显示掉落物品的概率显示。
 *
 *
 *遭遇，击败，分析，击败或分析，战书选择的时间。 （未注册）
 *战斗遭遇，击败，分析，击败或分析，战斗团结，怪物般的状态，精神注入时间。
 *如果是不存在的绘本，怪物的绘本，绘本，绘本，当然还有绘本，绘本，绘本，绘本。
 *
 * 状态信息中未注册的怪物是什么状态？ ?? ??您可以单独设置要显示的功能。
 *
 *
 *怪物类型类别设置
 * 怪物可以按类型显示。
 * 类别键可以设置为除 all 之外的任何字符串。
 * 如果您输入全部，将显示在绘本中注册的所有怪物。
 *敌人角色备忘录字段
 * <CategoryKey: [Key]> 设置要显示的类别。
 * <CategoryKey: [Key], [Key] ....> 可以设置多个可以显示的类别。
 * [Key]：Category Key（请输入插件参数中设置的字符串，不要加[]）
 *
 *页面上每个项目的设置
 *
 * 每个页面上的项目都是从“显示项目设置”中设置的。
 * 要在绘本中显示，请从“页面设置”的“指定显示列表”中选择要显示的列表。
 * 此设置与“分析设置”中的“显示项目设置”相同。
 *
 * [名称设置]
 * 可设置的怪物名称。
 * 如果留空，将显示此插件中设置的数据库和名称。
 *
 * [系统项目文字颜色设置]
 * 指定名称的文本颜色。
 *
 * [参数评估公式设置]
 * 填写评价公式。一定要填写原始参数。
 * 对怪物名称、怪物图像、抵抗属性、弱点属性、无效属性、抵抗状态、弱点状态、无效状态、掉落物品和钢铁物品以外的物品有效。
 * 如果留空，它将被自动引用。
 *
 * [描述字段设置]
 * 在描述字段中，在插件参数“描述字段标签名称”中输入任意字符串。某些字符串可能不可用
 * 请注意，有。如果输入desc1，当你在怪物的memo字段输入<desc1:ah ah>时，desc1会被输入到description字段的tag name中。
 *“啊”将显示在您填写的字段中。
 *
 * [X 显示位置]
 * 指定要显示的列。
 *
 * [Y显示位置]
 * 指定要显示的行。
 *
 * [物品显示模式]
 *跨多列显示项目。
 *
 * [系统项目宽度]
 * 指定系统字符的显示宽度。
 *
 * [信息未注册状态显示]
 * 隐藏未注册状态信息（未击败或分析）的怪物的状态。
 *
 * [名称、怪物名称显示位置]
 *指定名称和怪物名称的字符位置。
 *
 * [图像的最大垂直宽度]
 * 将图像的显示大小调整为指定行的大小。由于默认设置为8行，超过8行高度时调整大小。
 * 设置有怪物图像、普通图像和个体怪物图像。
 *
 * [常见图像]
 * 指定在同一页面上显示的通用图像。
 *
 * 【单元】
 * 设置附加能力值、特殊能力值、任意属性、可偷物品以及要添加到后缀的击败单位数量。
 *
 * [内容背景显示]
 * 当前回合显示的能力值、附加能力值、特殊能力值、任意属性、掉落物品、可偷物品、使用的技能、经验值、获得的金钱数量、失败次数、黑色背景（默认情况下） , 是否显示在表格中来设置。
 *
 * 如何设置分析
 * 从“分析设置”中的“分析技能设置”设置。
 * 对于要显示的内容，从“指定分析项目”中选择要显示的内容。
 * 与绘本相同：显示与页面设置中设置的内容相同的项目。
 * 显示项目设置 1：显示项目设置 1 中设置的项目。
 * 显示项目设置 2：显示项目设置 2 中设置的项目。
 *
 * 分析技能设置失败时的消息
 *% 1：目标名称
 *% 2：用户名
 * 当“%2 分析失败”时，如果技能用户是领导者，则显示“领导者分析失败”。
 *
 * 此插件需要“Common Processing”(NUUN_Base) 插件 Ver.1.1.4 或更高版本。
 *
 * 操作方法
 * 上/下（↑ ↓）键：怪物选择
 * 左/右（←→）键：页面切换
 * PgUp PgDn 键：怪物页面提要
 *
 * 触控操作
 * 向上/向下滑动：滚动（像玩一样大力滑动，相当于翻页）
 *
 * 插件命令
 *怪物图画书打开 打开图画书。
 *敌人信息显示打开敌人信息。
 * 添加怪物 将怪物添加到绘本中。没有注册状态信息。
 *删除怪物从图画书中删除怪物。
 *完成绘本完成绘本。
 * 初始化绘本 清除（全部删除）绘本。
 * 怪物状态信息注册 注册怪物状态信息。同时，“添加怪物”也进行了处理。
 * 删除怪物状态信息 删除怪物状态信息。
 *击败怪物使怪物被击败。
 *初始化失败次数重置怪物的失败次数。
 * 学习怪物掉落物品使怪物掉落物品获得。
 *未获得的怪物掉落物品使怪物掉落物品未获得。
 * Monster Steel Item Acquired 使怪物钢物品获得。
 * 未获得的怪物钢铁物品使怪物钢铁物品无法获得。
 * 打倒怪物的总数 打倒怪物的数量存储在一个变量中。
 * 遭遇次数 将遭遇的怪物数量存储在一个变量中。
 * 百科全书完成度 将当前完成度存储在一个变量中。
 * 总失败次数 将指定怪物的失败次数存储在变量中。
 * 判断已注册绘本指定的怪物被判断为已在绘本中注册。
 * 状态信息已注册的判断 判断指定怪物的状态信息是否已注册。
 * 判断该项目已被丢弃 判断指定的项目是否已被丢弃。
 * 物品被盗判断 判断指定物品是否被盗。
 * 确认敌人的使用技能 确认敌人的使用技能。全部设置为 0 以确认。
 * 未确认敌人的技能：使敌人的技能未确认。设置为 0 以取消确认所有内容。
 * 敌人属性抗性弱点确认 敌人属性抗性弱点确认。全部设置为 0 以确认。 （需要 NUUN_EnemyBookEX_1）
 * 敌人的属性抗性弱点未确认敌人的属性抗性弱点未确认。设置为 0 以取消确认所有内容。 （需要 NUUN_EnemyBookEX_1）
 * 确认敌国抵抗力弱点 确认敌国抵抗力弱点。全部设置为 0 以确认。 （需要 NUUN_EnemyBookEX_1）
 * 敌人的状态抵抗弱点未确认敌人的状态抵抗弱点未确认。设置为 0 以取消确认所有内容。 （需要 NUUN_EnemyBookEX_1）
 * 确认敌人减益抗性弱点 确认敌人减益抗性弱点。全部设置为 0 以确认。 （需要 NUUN_EnemyBookEX_1）
 * 敌人减益抗性弱点未确认 敌人减益抗性弱点未确认。设置为 0 以取消确认所有内容。 （需要 NUUN_EnemyBookEX_1）
 *
 * 原始参数参考变量
 * 从 this._enemy 或 de 数据库中获取怪物数据。
 * 获取 this._enemy.meta 元标记。
 * 获取敌人或 Game_Enemy 的数据。
 *
 * 此插件基于 Yoji Ojima、Ebi 和 TOMY (Kamesoft)。
 *
 * 规格
 * 页面选择窗口中的光标移动仅适用于左右键。
 * 怪物图像显示在普通图像和单个怪物图像的后面。
 * 可以设置和显示多个常见图像和单个怪物图像。
 * 如果在战斗中打开背景图显示，绘本、敌人信息和分析将处于背景图显示模式。
 * 如果未指定敌人图像或分析图像，则会显示绘本背景的第一个背景。
 * 如果你关闭了隐藏的掉落物品、钢铁物品名称和使用的技能名称，即使你打开了中间的设置，你也已经获得并学会了它。
 * 项目和技能不反映。
 * 
 * 利用規約
 * 这个插件是在 MIT 许可下分发的。
 * 
 * 2021/2/7 Ver.1.0.0
 * 初版
 * 
 * @command EnemyBookOpen
 * @desc モンスター図鑑を開きます。
 * @text 怪物图鉴打开
 * 
 * @command EnemyInfoOpen
 * @desc 敵の情報を開きます。
 * @text 敌人信息显示
 * 
 * @command EnemyBookAdd
 * @desc モンスターを図鑑に追加します。ステータス情報は登録されません。
 * @text 添加怪物
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @command EnemyBookRemove
 * @desc モンスターを図鑑から削除します。
 * @text 删除怪物
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @command EnemyBookStatusAdd
 * @desc モンスターのステータス情報を登録します。「モンスター追加」の処理も行います。
 * @text 怪物状态信息登记
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusRemove
 * @desc モンスターのステータス情報を削除します。
 * @text 删除怪物状态信息
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させます。
 * @text 完成的图鉴
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリア（消去）します。
 * @text 图鉴初期化
 * 
 * @command EnemyBookAddDefeat
 * @desc 使怪物消灭。
 * @text 击败怪物
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 *  
 * @command EnemyBookRemoveDefeat
 * @desc モンスターの撃破数をリセットします。(0で全てのモンスターの撃破数をリセットします)
 * @text 击破数初期化
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @command EnemyBookGetDropItem
 * @desc モンスターのドロップアイテムを取得済みにします。
 * @text 学习怪物掉落物品
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text 拖放项目列表 ID
 * @desc 指定放置项目列表 ID。 （设置为 0 获取全部）
 * 
 * @command EnemyBookRemoveDropItem
 * @desc モンスターのドロップアイテムを未収得にします。
 * @text 未获得的怪物掉落物品
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text 拖放项目列表 ID
 * @desc 指定放置项目列表 ID。 （0 表示全部未获取）
 * 
 * @command EnemyBookGetStealItem
 * @desc モンスターのスティールアイテムを取得済みにします。
 * @text 获得怪物钢铁物品
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text 钢铁项目列表 ID
 * @desc 指定钢材项目列表 ID。 （设置为 0 获取全部）
 * 
 * @command EnemyBookRemoveStealItem
 * @desc モンスターのスティールアイテムを未取得にします。
 * @text 怪物钢铁物品未获得
 * @type 0
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text 钢铁项目列表 ID
 * @desc 指定钢材项目列表 ID。 （0 表示全部未获取）
 * 
 * @command EnemyBookDefeatEnemy
 * @desc 存储已击败的怪物数量。
 * @text 总失败次数 怪物数量
 * 
 * @arg DefeatEnemy
 * @type variable
 * @default 0
 * @text 变量
 * @desc 指定一个变量来代替被击败的怪物的数量。
 * 
 * @command EnemyBookEncounteredEnemy
 * @desc 遭遇したモンスター数を格納します。
 * @text 遭遇数
 * 
 * @arg EncounteredEnemy
 * @type variable
 * @default 0
 * @text 变量
 * @desc 遭遇したモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookCompleteRate
 * @desc 存储完整性。
 * @text 图鉴完成度
 * 
 * @arg CompleteRate
 * @type variable
 * @default 0
 * @text 変数
 * @desc 指定分配图鉴完整性的变量。
 * 
 * @command EnemyBookRegistration
 * @desc モンスターが図鑑に登録済みか判定します。
 * @text 判断图鉴已注册
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text 怪物
 * @desc モンスターを指定します。
 * 
 * @arg registrationSwitch
 * @type switch
 * @default 0
 * @text 转变
 * @desc 指定一个开关来分配怪物是否在图画书中登记。
 * 
 * @command EnemyBookStatusRegistration
 * @desc モンスターのステータス情報が図鑑に登録済みか判定します。
 * @text 状态信息注册判断
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text 怪物
 * @desc モンスターを指定します。
 * 
 * @arg statusRegistrationSwitch
 * @type switch
 * @default 0
 * @text 转变
 * @desc モンスターが図鑑に登録済みかを代入するスイッチを指定します。
 * 
 * @command EnemyBookDefeatEnemySum
 * @desc 存储被破坏的怪物数量。
 * @text 总失败次数
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text 怪物
 * @desc モンスターを指定します。
 * 
 * @arg DefeatEnemySum
 * @type variable
 * @default 0
 * @text 変数
 * @desc モンスターの撃破数を代入する変数を指定します。
 * 
 * @command DorpItemAcquired
 * @desc 指定のアイテムがドロップ済みか判定します。
 * @text 物品掉落判断
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg DorpItemAcquiredId
 * @type number
 * @default 0
 * @text 物品下拉列表 ID
 * @desc 指定项目下拉列表 ID。 （全部为 0）
 * 
 * @arg DorpItemAcquiredswitch
 * @type switch
 * @default 0
 * @text 缩回开关
 * @desc アイテムがドロップ済みかを代入する変数を指定します。
 * 
 * @command StealItemAcquired
 * @desc 指定のアイテムが盗み済みか判定します。
 * @text 物品被盗判断
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg stealAcquiredId
 * @type number
 * @default 0
 * @text 钢铁项目列表 ID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @arg StealAcquiredswitch
 * @type switch
 * @default 0
 * @text 缩回开关
 * @desc 指定一个变量来分配物品是否被盗。
 * 
 * @command EnemyBookActionAdd
 * @desc モンスターの未確認の使用スキルを確認済みにします。
 * @text 未确认 技能已确认
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行为模式 ID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookActionRemove
 * @desc モンスターの確認済みの使用スキルを未確認にします。
 * @text 已确认 使用未经确认的技能
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg actionId
 * @type number
 * @default 0
 * @text 行为模式 ID
 * @desc 行動パターンID（一番上が１番）（0ですべて）
 * 
 * @command EnemyBookElementAdd
 * @desc モンスターの未確認の属性耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
 * @text 未确认属性抗性 已确认弱点信息
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookElementRemove
 * @desc モンスターの確認済みの属性耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
 * @text 确认済み属性耐性弱点情报未确认
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg elementId
 * @type number
 * @default 0
 * @text 属性ID
 * @desc 属性ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateAdd
 * @desc モンスターの未確認のステート耐性弱点情報を確認済みにします。(要NUUN_EnemyBookEX_1)
 * @text 未确认状态阻力 已确认弱点信息
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text 状态ID
 * @desc 状态ID（データベースのタイプタグの属性）（0ですべて）
 * 
 * @command EnemyBookStateRemove
 * @desc モンスターの確認済みのステート耐性弱点情報を未確認にします。(要NUUN_EnemyBookEX_1)
 * @text 已确认的状态阻力 未确认的弱点信息
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg stateId
 * @type state
 * @default 0
 * @text 状态ID
 * @desc 状态 ID（数据库类型标签的属性）（全部为 0（无））
 * 
 * @command EnemyBookDebuffAdd
 * @desc 使怪物的未确认debuff抗性弱点信息得到确认。 （需要 NUUN_EnemyBookEX_1）
 * @text 未确认减益抗性 已确认弱点信息
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg debuffId
 * @text 减益目标
 * @desc 指定要确认的debuff目标。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻击力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 运气
 * @value 7
 * @option 全部
 * @value -1
 * @default -1
 * 
 * @command EnemyBookDebuffRemove
 * @desc 使已确认的怪物的debuff抗性弱点信息不被确认。 （需要 NUUN_EnemyBookEX_1）
 * @text 确认debuff抗性弱点信息未确认
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc 指定怪物ID。
 * 
 * @arg debuffId
 * @text 减益目标
 * @desc 指定要确认的debuff目标。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 运气
 * @value 7
 * @option 全部
 * @value -1
 * @default -1
 * 
 * 
 * 
 * 
 * パラメータ
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc 指定怪物选择画面的显示位置。
 * @text ♥图鉴选择项画面位置
 * @type select
 * @option 左側显示
 * @value 0
 * @option 右側显示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @text 出现条件
 * @desc 出现条件
 * @type select
 * @option 在战斗开始时
 * @value 0
 * @option 战败时
 * @value 1
 * @option 分析时
 * @value 2
 * @option 在失败或分析时
 * @value 3
 * @option 在战斗结束时
 * @value 4
 * @option 没有注册
 * @value 10
 * @desc 图鉴出现时
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationStatusTiming
 * @text 状态信息登记时间
 * @desc 状态信息登记时间
 * @type select
 * @option 在战斗开始时
 * @value 0
 * @option 战败时
 * @value 1
 * @option 在失败或分析时
 * @value 2
 * @option 在失败或分析时
 * @value 3
 * @option 在战斗结束时
 * @value 4
 * @option 没有注册
 * @value 10
 * @default 0
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc 认为变形前的敌人已经被消灭。
 * @text 变形前的敌人
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param UnknownData
 * @desc 未确认的索引名称。 ?? 如果只输入一个字符，取决于名称中的字符数？ 将被替换。
 * @text 不明怪物和类别名称
 * @type string
 * @default ？
 * @parent BasicSetting
 * 
 * @param DecimalMode
 * @text 四舍五入
 * @desc 将显示的小数点四舍五入。 （用false断）
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param CommandSetting
 * @text 命令设置
 * @default ------------------------------
 * 
 * @param ShowCommand
 * @desc 在菜单命令中添加怪物图鉴。
 * @text ♥主菜单命令显示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookSwitch 
 * @desc 要显示的标志开关 ID
 * @text ♥菜单命令显示开关
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param ShowBattleCommand
 * @desc 在战斗中将敌人的图鉴添加到队伍命令中。
 * @text ♥战斗图鉴显示选项
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookBattleSwitch
 * @desc 战斗中显示的标志开关ID
 * @text ♥显示的战斗图鉴开关ID
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param CommandName
 * @desc 命令的名称
 * @text ♥命令显示名称
 * @type string
 * @default 怪物图鉴
 * @parent CommandSetting
 * 
 * @param ShowEnemyInfoCommand
 * @desc 将敌人信息添加到战斗中的队伍命令中。
 * @text ♥敌方情报显示
 * @type boolean
 * @default false
 * @parent CommandSetting
 * 
 * @param enemyBookInfoSwitch
 * @desc 战斗中显示敌人信息的标志开关ID
 * @text ♥敌方情报信息显示开关
 * @type switch
 * @default 0
 * @parent CommandSetting
 * 
 * @param EnemyInfoCommandName
 * @desc 敌人信息名称。
 * @text ♥敌人情报命令显示名称
 * @type string
 * @default 敌方情报
 * @parent CommandSetting
 * 
 * @param WindowSetting
 * @text 常用窗口设置
 * @default ------------------------------
 * 
 * @param BookWidth
 * @desc 图鉴主窗口的宽度。 （0 是屏幕的 2/3）
 * @text 图鉴宽度
 * @type number
 * @default 0
 * @min 0
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text 战斗中触摸 UI 当 UI 关闭时，窗口被置顶
 * @desc 战斗中的触摸界面关闭时，窗口关闭。
 * @parent WindowSetting
 * 
 * @param Category
 * @text 类别窗口设置
 * @default ------------------------------
 * 
 * @param CategoryOn
 * @type boolean
 * @default false
 * @text ♥怪物类别显示
 * @desc 按类别显示怪物。
 * @parent Category
 * 
 * @param EnemyBookCategory
 * @desc 设置怪物类别。
 * @text ♥怪物类别设置
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"全部\",\"CategoryKey\":\"all\"}","{\"CategoryName\":\"BOSS\",\"CategoryKey\":\"boss\"}"]
 * @parent Category
 * 
 * @param CategoryVisibleType
 * @text 未曾遇到的类别展示
 * @desc 没有遇到任何人时的类别显示。
 * @type select
 * @option 表示
 * @value 0
 * @option 非表示
 * @value 1
 * @option 用另一个字符串隐藏
 * @value 2
 * @default 0
 * @parent Category
 * 
 * @param CategoryWindowsSkin
 * @desc 指定类别屏幕的窗口皮肤。
 * @text 类别窗口皮肤
 * @type file
 * @dir img/system
 * @default 
 * @parent Category
 * 
 * @param CategoryNameWindowsSkin
 * @desc 类别名称 指定屏幕的窗口皮肤。
 * @text 类别名称窗口皮肤
 * @type file
 * @dir img/system
 * @default 
 * @parent Category
 * 
 * @param PercentWindow
 * @text 完整性窗口设置
 * @default ------------------------------
 * 
 * @param PercentWindowVisible
 * @type boolean
 * @default true
 * @text ♥完整性窗口显示
 * @desc 显示完美窗口。
 * @parent PercentWindow
 * 
 * @param PercentContent
 * @desc 设置完整性窗口的显示项目。
 * @text ♥表示項目設定
 * @type struct<PercentContentList>[]
 * @default ["{\"ContentName\":\"完成度\",\"ContentDate\":\"0\"}","{\"ContentName\":\"遭遇数\",\"ContentDate\":\"1\"}","{\"ContentName\":\"击败数\",\"ContentDate\":\"2\"}"]
 * @parent PercentWindow
 * 
 * @param Interval
 * @desc 完成的窗口更新框架
 * @text ♥更新帧间隔
 * @type number
 * @default 100
 * @max 999999
 * @min 0
 * @parent PercentWindow
 * 
 * @param PercentWindowsSkin
 * @desc 指定完美窗口皮肤。
 * @text 完美窗皮
 * @type file
 * @dir img/system
 * @default 
 * @parent PercentWindow
 * 
 * @param EnemyIndexWindow
 * @text 怪物列表窗口设置
 * @default ------------------------------
 * 
 * @param NumberType
 * @text ♥怪物数量显示
 * @desc 显示怪物的数量。
 * @type select
 * @option 没有显示怪物编号
 * @value 0
 * @option 显示怪物编号。
 * @value 1
 * @option 显示怪物编号并用 0 填充。
 * @value 2
 * @desc 没有显示怪物
 * @default 1
 * @parent EnemyIndexWindow
 * 
 * @param UnknownVisible
 * @desc 不要在列表中显示未识别的怪物。
 * @text ♥不明怪物不显示
 * @type boolean
 * @default false
 * @parent EnemyIndexWindow
 * 
 * @param NumberMode
 * @desc 数字显示按每个类别显示的顺序显示。
 * @text 编号类别显示顺序显示
 * @type boolean
 * @default false
 * @parent EnemyIndexWindow
 * 
 * @param UnknownEnemyIcons
 * @desc 未注册的怪物图标。
 * @text 未注册的怪物图标
 * @type number
 * @default 0
 * @min 0
 * @parent EnemyIndexWindow
 * 
 * @param IndexWindowsSkin
 * @desc 指定怪物列表画面的窗口皮肤
 * @text 怪物列表窗口皮肤
 * @type file
 * @dir img/system
 * @default 
 * @parent EnemyIndexWindow
 * 
 * @param NoCursorBackground
 * @desc 不显示敌人选择字段的背景。
 * @text 没有光标背景
 * @type boolean
 * @default false
 * @parent EnemyIndexWindow
 * 
 * @param PageWindow
 * @text 页面窗口设置
 * @default ------------------------------
 * 
 * @param PageWindowsShow
 * @desc 显示多页描述信息
 * @text ★显示多页描述信息
 * @type boolean
 * @default true
 * @parent PageWindow
 * 
 * @param PageWindowsSkin
 * @desc 指定页面屏幕的窗口皮肤。
 * @text 页面窗口皮肤
 * @type file
 * @dir img/system
 * @default 
 * @parent PageWindow
 * 
 * @param EnemyBookWindow
 * @text 图鉴窗口设置
 * @default ------------------------------
 * 
 * @param EnemyBookDefaultFontSize
 * @desc 字体大小（与主要字体的差异）
 * @text 字体大小
 * @type number
 * @default 0
 * @min -99
 * @parent EnemyBookWindow
 * 
 * @param EnemyBookFontMargin
 * @desc 项目上垂直文本的边距
 * @text 项目上垂直文本的边距
 * @type number
 * @default 10
 * @min 0
 * @parent EnemyBookWindow
 * 
 * @param UnknownStatus
 * @desc 未注册状态信息时的状态显示名称
 * @text ♥状态信息 未注册时 状态显示名称
 * @type string
 * @default ？？？
 * @parent EnemyBookWindow
 * 
 * @param UnknownItems
 * @desc 状态信息未登录时的道具和技能显示名称
 * @text 状态信息未登录时的项目，技能显示名称
 * @type string
 * @default ？
 * @parent EnemyBookWindow
 * 
 * @param ImgFolder
 * @desc 指定个别规格 指定图像的文件夹名称。 （直接在img下）
 * @text 单独指定的图像文件夹
 * @type string
 * @default 'pictures'
 * @parent EnemyBookWindow
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text 侧视管家反转
 * @desc 显示侧视管家时反转图像。
 * @parent EnemyBookWindow
 * 
 * @param EnemyBookBackGround
 * @text 背景画像表示
 * @desc 显示图鉴的背景图片。
 * @type boolean
 * @default false
 * @parent EnemyBookWindow
 * 
 * @param BackUiWidth
 * @text 将背景大小与 UI 匹配
 * @desc 将背景大小与 UI 匹配。
 * @type boolean
 * @default true
 * @parent EnemyBookWindow
 * 
 * @param EnemyBookSetting
 * @text 图鉴設定
 * @default ------------------------------
 * 
 * @param PageSetting
 * @desc 页面设置。
 * @text ★页面设置
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"掉落物品\"}","{\"ListDateSetting\":\"4\",\"PageCategoryName\":\"説明\"}"]
 * @parent EnemyBookSetting
 * 
 * @param PageCols
 * @desc 页面的最大显示列。
 * @text ♥最大表示列
 * @type number
 * @default 3
 * @min 1
 * @parent EnemyBookSetting
 * 
 * @param ContentCols
 * @text 怪物信息项列数
 * @desc 怪物信息中物品栏的数量。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent EnemyBookSetting
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent EnemyBookSetting
 * 
 * @param ContentWindowsSkin
 * @desc モンスター情報画面のウィンドウスキンを指定します。
 * @text 窗皮
 * @type file
 * @dir img/system
 * @default 
 * @parent EnemyBookSetting
 * 
 * @param AnalyzeSetting
 * @text 分析设置
 * @default ------------------------------
 * 
 * @param AnalyzeSkillMode
 * @desc 设置分析技能。 0：同图鉴设置 1：AnalyzePageList1 2：AnalyzePageList2 3 及以上不反映。
 * @text 分析技能设置
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"PageCols\":\"4\",\"Mode\":\"0\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"PageCols\":\"1\",\"Mode\":\"1\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList1
 * @desc 要显示的项目设置。
 * @text 表示項目設定１
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"11\",\"PageCategoryName\":\"\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList2
 * @desc 表示する項目設定。
 * @text 表示項目設定２
 * @type struct<PageSettingData>[]
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList3
 * @desc 表示する項目設定。
 * @text 表示項目設定３
 * @type struct<PageSettingData>[]
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param CommonVariableID
 * @desc コモンイベント指定にモンスターIDを代入する変数
 * @text 怪物 ID 分配变量
 * @type variable
 * @default 0
 * @parent AnalyzeSetting
 * 
 * @param AnalyzeBackGroundImg
 * @desc 指定分析的背景图像文件名。
 * @text 分析背景图像
 * @type file[]
 * @dir img/
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param EnemyInfoSetting
 * @text 敌人信息设置
 * @default ------------------------------
 * 
 * @param InfoMode
 * @desc 表示する敵の情報データを指定します。
 * @text 信息数据规范
 * @type select
 * @option 同图鉴展示
 * @value 0
 * @option 设置你自己的
 * @value 1
 * @default 0
 * @parent EnemyInfoSetting
 * 
 * @param InfoPageSetting
 * @desc 页面设置。（当信息数据设置为原始设置时 (1)）
 * @text 页面设置
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情报\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"ドロップアイテム\"}","{\"ListDateSetting\":\"4\",\"PageCategoryName\":\"説明\"}"]
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationEnemyInfo
 * @desc 登録タイミングを敵の情報にも反映させます。
 * @text 反映敌人信息登记时机
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationEnemyInfoColor
 * @desc 登録済みモンスター名の色。
 * @text 注册的怪物名称颜色
 * @type number
 * @default 0
 * @max 999
 * @parent EnemyInfoSetting
 * 
 * @param RegistrationStatusEnemyInfoColor
 * @desc 情報登録済みモンスター名の色。
 * @text 信息注册怪物名称颜色
 * @type number
 * @default 0
 * @max 999
 * @parent EnemyInfoSetting
 * 
 * @param InfoMaskMode
 * @desc 如果未披露任何信息，则隐藏状态。 在显示列表中反映为每个项目设置的“信息未注册状态表”。
 * @text 信息未注册状态显示
 * @type boolean
 * @default false
 * @parent EnemyInfoSetting
 * 
 * @param InfoPageCols
 * @desc ページの最大表示列。
 * @text 信息未注册状态显示
 * @type number
 * @default 4
 * @min 1
 * @parent EnemyInfoSetting
 * 
 * @param InfoContentCols
 * @text 怪物信息项列数
 * @desc 怪物信息中物品栏的数量。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent EnemyInfoSetting
 * 
 * @param EnemyInfoGroundImg
 * @desc 指定敌人信息的背景图像文件名。
 * @text 敌人信息背景图
 * @type file[]
 * @dir img/
 * @default []
 * @parent EnemyInfoSetting
 * 
 * @param InfoIndexWindowsSkin
 * @desc 指定敌人信息屏幕的窗口皮肤。
 * @text 敌人信息窗口皮肤
 * @type file
 * @dir img/system
 * @default 
 * @parent EnemyInfoSetting
 * 
 * @param BattleEnemyBookSetting
 * @text 战斗图鉴设定
 * @default ------------------------------
 * 
 * @param InfoStatusGaugeVisible
 * @type boolean
 * @default true
 * @text 显示仪表
 * @desc 显示 HP 和 MP 计量器。
 * @parent BattleEnemyBookSetting
 * 
 * @param InfoEnemyCurrentStatus
 * @type boolean
 * @default true
 * @text 敌人当前状态显示
 * @desc 显示敌人的当前状态。
 * @parent BattleEnemyBookSetting
 * 
 * @param InfoBuffColor
 * @desc 抛光时的字符颜色。
 * @text 抛光时的字符颜色。
 * @type number
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param InfoDebuffColor
 * @desc デバフ時の文字色。
 * @text debuff时的角色颜色
 * @type number
 * @default 0
 * @max 999999
 * @parent BattleEnemyBookSetting
 * 
 * @param HPgaugeWidth
 * @desc HPゲージ横幅
 * @text HP 量规宽度
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param MPgaugeWidth
 * @desc MPゲージ横幅
 * @text MP量规宽度
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param TPgaugeWidth
 * @desc TPゲージ横幅
 * @text TP 量规宽度
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent BattleEnemyBookSetting
 * 
 * @param ListData
 * @text 表示項目設定
 * @default ------------------------------
 * 
 * @param ListData1_10
 * @text 表示項目設定1-10
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList1
 * @desc 表示するリスト。
 * @text 显示列表 1
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"12\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"32\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"30\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"31\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1000\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1000\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList2
 * @desc 表示するリスト。
 * @text 显示列表 2
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"12\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"40\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"41\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"45\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"46\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1000\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 显示列表 3
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"12\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"60\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"desc\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text ★显示列表 4
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"12\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}","{\"BasicSetting\":\"\",\"paramName\":\"説明\",\"DateSelect\":\"70\",\"DetaEval\":\"[]\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"Back\":\"false\",\"Decimal\":\"0\",\"FontSize\":\"0\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"desc\",\"ImgSetting\":\"\",\"ImgData\":\"[]\",\"ImgMaxHeight\":\"8\",\"UnitSetting\":\"\",\"paramUnit\":\"\"}"]
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc 表示するリスト。
 * @text 显示列表 5
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc 表示するリスト。
 * @text 显示列表 6
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc 表示するリスト。
 * @text 显示列表 7
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc 表示するリスト。
 * @text 显示列表 8
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc 表示するリスト。
 * @text 显示列表 9
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc 表示するリスト。
 * @text 显示列表 10
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param ListData11_20
 * @text 表示項目設定11-20
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList11
 * @desc 表示するリスト。
 * @text 显示列表 11
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData11_20
 * 
 * @param PageList12
 * @desc 表示するリスト。
 * @text 显示列表 12
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList13
 * @desc 表示するリスト。
 * @text 显示列表 13
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList14
 * @desc 表示するリスト。
 * @text 显示列表 14
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList15
 * @desc 表示するリスト。
 * @text 显示列表 15
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList16
 * @desc 表示するリスト。
 * @text 显示列表 16
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList17
 * @desc 表示するリスト。
 * @text 显示列表 17
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList18
 * @desc 表示するリスト。
 * @text 显示列表 18
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList19
 * @desc 表示するリスト。
 * @text 显示列表 19
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList20
 * @desc 表示するリスト。
 * @text 显示列表 20
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param DropItemData
 * @text 掉落物品设置
 * @default ------------------------------
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 隐藏身份不明的掉落物品。 （即使您注册了状态信息，也不会显示，直到您确认放置项目）
 * @text 未确认的掉落物品名称
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text 宽屏模式下的多列显示
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param StealItemData
 * @text 物品设置
 * @default ------------------------------
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 概率显示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。(ステータス情報登録をしてもスティールアイテムを確認するまでは表示されません)
 * @text 不明钢铁物品展示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItem2Col
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text 宽屏模式下的多列显示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param ActionData
 * @text 敌人技能设置
 * @default ------------------------------
 * 
 * @param ShowActionName
 * @desc 未確認の使用スキルを隠す。(ステータス情報登録をしてもスティールアイテム使用スキルを確認するまでは表示されません)
 * @text 未确认技能展示
 * @type boolean
 * @default false
 * @parent ActionData
 * 
 * @param ActionMaxItems
 * @desc 表示する最大項目数。(0で制限なし)
 * @text 最大項目数
 * @type number
 * @default 0
 * @min 0
 * @parent ActionData
 * 
 * @param ActionMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text 宽屏模式下的多列显示
 * @type boolean
 * @default false
 * @parent ActionData
 * 
 * @param ResistWeakElementData
 * @text 属性耐性弱点設定
 * @default ------------------------------
 * 
 * @param ElementList
 * @desc 表示する属性。
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ResistWeakElementData
 * 
 * @param ShowElementsIcon
 * @desc 耐性弱点未確認の属性を隠す。(ステータス情報登録をしても属性耐性弱点を確認するまでは表示されません)
 * @text 宽模式下的多列显示隐藏未确认的属性（需要NUUN_EnemyBookEX_1）
 * @type boolean
 * @default false
 * @parent ResistWeakElementData
 * 
 * @param ResistNoEffectElement
 * @desc 您想在难以工作的属性中反映无效性吗？
 * @text 对难以工作的属性的无效反射
 * @type boolean
 * @default true
 * @parent ResistWeakElementData
 * 
 * @param ElementUnknownIconId
 * @desc ステータス情報未登録時に表示する属性アイコンのIDを指定します。
 * @text 状态信息未登录时的属性图标ID
 * @type number
 * @default 0
 * @parent ResistWeakElementData
 * 
 * @param ElementRadarChart
 * @text 属性抗性雷达图
 * @default ------------------------------
 * @parent ResistWeakElementData
 * 
 * @param ElementRadarChartRadius
 * @desc レーダチャートの半径。
 * @text 雷达图半径
 * @type number
 * @default 100
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text 雷达图框颜色
 * @type number
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text 雷达图线条颜色
 * @type number
 * @default 15
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text 雷达图中心背景颜色
 * @type number
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text 雷达图外部背景颜色
 * @type number
 * @default 3
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text 雷达图 X 坐标
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text 雷达图 Y 坐标
 * @type number
 * @min -9999
 * @default 48
 * @parent ElementRadarChart
 * 
 * @param ElementRadarChart_FontSize
 * @desc 字体大小。 （来自主要字体）
 * @text 字体大小
 * @type number
 * @default -12
 * @min -9999
 * @parent ElementRadarChart
 * 
 * @param ResistWeakStateData
 * @text 抵抗力弱点设置
 * @default ------------------------------
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 显示状态
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakStateData
 * 
 * @param ShowStateIcon
 * @desc 耐性弱点未確認のステートを隠す。(ステータス情報登録をしてもステート耐性弱点を確認するまでは表示されません)
 * @text 隐藏未确认状态（需要 NUUN_EnemyBookEX_1）
 * @type boolean
 * @default false
 * @parent ResistWeakStateData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。
 * @text 反映易于使用的属性的 100% 有效性
 * @type boolean
 * @default false
 * @parent ResistWeakStateData
 * 
 * @param ResistNoEffectState
 * @desc 想在努力工作的状态下体现无效？
 * @text 无效状态下的无效反射
 * @type boolean
 * @default true
 * @parent ResistWeakStateData
 * 
 * @param StateUnknownIconId
 * @desc ステータス情報未登録時に表示するステートアイコンのIDを指定します。
 * @text 状态信息未登录时的状态图标 ID
 * @type number
 * @default 0
 * @parent ResistWeakStateData
 * 
 * @param StateRadarChart
 * @text 状态电阻雷达图
 * @default ------------------------------
 * @parent ResistWeakStateData
 * 
 * @param StateRadarChartRadius
 * @desc レーダチャートの半径。
 * @text 雷达图半径
 * @type number
 * @default 100
 * @parent StateRadarChart
 * 
 * @param StateRadarChartFramecolor
 * @desc レーダチャートの枠の色を設定します。
 * @text 雷达图框颜色
 * @type number
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartLineColor
 * @desc レーダチャートの線の色を設定します。
 * @text 雷达图线条颜色
 * @type number
 * @default 15
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor1
 * @desc レーダチャートの中心の背景色を設定します。
 * @text 雷达图中心背景颜色
 * @type number
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartMainColor2
 * @desc レーダチャートの外側背景色を設定します。
 * @text 雷达图外部背景颜色
 * @type number
 * @default 3
 * @parent StateRadarChart
 * 
 * @param StateRadarChartX
 * @desc レーダチャートのX座標（相対）。
 * @text 雷达图 X 坐标
 * @type number
 * @min -9999
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChartY
 * @desc レーダチャートのY座標（相対）。
 * @text雷达图 Y 坐标
 * @min -9999
 * @type number
 * @default 48
 * @parent StateRadarChart
 * 
 * @param StateRadarChart_FontSize
 * @desc 字体大小。 （来自主要字体）
 * @text 字体大小
 * @type number
 * @default -12
 * @min -9999
 * @parent StateRadarChart
 * 
 * @param RadarChartIcon
 * @desc 用图标显示状态显示。 OFF 是状态名称
 * @text 图标显示
 * @type boolean
 * @default true
 * @parent StateRadarChart
 * 
 * @param ResistWeakDebuffData
 * @text 减益抗性弱点设置
 * @default ------------------------------
 * 
 * @param DeBuffList
 * @desc 要显示的减益。
 * @text 显示减益
 * @type struct<DebuffData>[]
 * @default ["{\"ParamId\":\"0\",\"DebuffIconId\":\"48\"}","{\"ParamId\":\"1\",\"DebuffIconId\":\"49\"}","{\"ParamId\":\"2\",\"DebuffIconId\":\"50\"}","{\"ParamId\":\"3\",\"DebuffIconId\":\"51\"}","{\"ParamId\":\"4\",\"DebuffIconId\":\"52\"}","{\"ParamId\":\"5\",\"DebuffIconId\":\"53\"}","{\"ParamId\":\"6\",\"DebuffIconId\":\"54\"}","{\"ParamId\":\"7\",\"DebuffIconId\":\"55\"}"]
 * @parent ResistWeakDebuffData
 * 
 * @param ShowDebuffIcon
 * @desc 隐藏抗性弱点未识别状态减益。 （即使你注册了状态信息，也不会显示，直到你确认debuff抵抗弱点）
 * @text 隐藏不明debuff（需要NUUN_EnemyBookEX_1）
 * @type boolean
 * @default false
 * @parent ResistWeakDebuffData
 * 
 * @param DeBuffUnknownIconId
 * @desc 指定状态信息未登录时显示的debuff图标的ID。
 * @text 状态信息未登录时的debuff图标ID
 * @type number
 * @default 0
 * @parent ResistWeakDebuffData
 * 
 */
/*~struct~ElementData:
 * 
 * @param ElementNo
 * @desc 要显示的属性编号。
 * @text 属性号
 * @type number
 * 
 * @param ElementIconId
 * @desc 指定图标的 ID。
 * @text 图标 ID
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateId
 * @desc 要显示的状态。
 * @text 显示的状态。
 * @type state
 *
 */
/*~struct~DebuffData:
 * 
 * @param ParamId
 * @text 减益目标
 * @desc 指定显示减益。
 * @type select
 * @option ＨＰ
 * @value 0
 * @option ＭＰ
 * @value 1
 * @option 攻击力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 运气
 * @value 7
 * @default 0
 * 
 * @param DebuffIconId
 * @desc 指定图标的 ID。
 * @text 图标 ID
 * @type number
 */
/*~struct~PageSettingData:
 * 
 * @param ListDateSetting
 * @desc 表示するリストを指定します。
 * @text 显示列表规范
 * @type select
 * @option 显示列表 1
 * @value 1
 * @option 表示列表２
 * @value 2
 * @option 表示列表３
 * @value 3
 * @option 表示列表４
 * @value 4
 * @option 表示列表５
 * @value 5
 * @option 表示列表６
 * @value 6
 * @option 表示列表７
 * @value 7
 * @option 表示列表８
 * @value 8
 * @option 表示列表９
 * @value 9
 * @option 表示列表１０
 * @value 10
 * @option 表示列表１１
 * @value 11
 * @option 表示列表１２
 * @value 12
 * @option 表示列表１３
 * @value 13
 * @option 表示列表１４
 * @value 14
 * @option 表示列表１５
 * @value 15
 * @option 表示列表１６
 * @value 16
 * @option 表示列表１７
 * @value 17
 * @option 表示列表１８
 * @value 18
 * @option 表示列表１９
 * @value 19
 * @option 表示列表２０
 * @value 20 
 * @default 1
 * 
 * @param PageCategoryName
 * @desc 设置页面类别的名称。
 * @text 页面类别名称
 * @type string
 * @default
 * 
 * @param PageBackGroundId
 * @desc 背景画像を指定します。0の場合はリスト1番の画像が表示されます。
 * @text 背景画像Id
 * @type number
 * @default 1
 *  
 */
/*~struct~PageListData:
 * 
 * @param BasicSetting
 * @text 基本設定
 * 
 * @param paramName
 * @desc 设置要显示的项目的名称。
 * @text 项目的名称
 * @type string
 * @default
 * @parent BasicSetting
 * 
 * @param DateSelect
 * @desc 物品清单
 * @text 物品清单
 * @type select
 * @option 无显示
 * @value 0
 * @option 最大HP(1)～(11)(18)
 * @value 1
 * @option 最大MP(1)～(11)(18)
 * @value 2
 * @option 攻击力(1)～(11)(18)
 * @value 3
 * @option 防御力(1)～(11)(18)
 * @value 4
 * @option 魔法力(1)～(11)(18)
 * @value 5
 * @option 魔法防御(1)～(11)(18)
 * @value 6
 * @option 敏捷性(1)～(11)(18)
 * @value 7
 * @option 运气(1)～(11)(18)
 * @value 8
 * @option TP（仅当前状态为 ON 时）(1)～(11)(18)
 * @value 9
 * @option 命中率(1)～(11)(16)(17)(18)
 * @value 10
 * @option 回避率(1)～(11)(16)(17)(18)
 * @value 11
 * @option 会心率(1)～(11)(16)(17)(18)
 * @value 12
 * @option 会心回避率(1)～(11)(16)(17)(18)
 * @value 13
 * @option 魔法回避率(1)～(11)(16)(17)(18)
 * @value 14
 * @option 魔法反射率(1)～(11)(16)(17)(18)
 * @value 15
 * @option 反击率(1)～(11)(16)(17)(18)
 * @value 16
 * @option HP再生率(1)～(11)(16)(17)(18)
 * @value 17
 * @option MP再生率(1)～(11)(16)(17)(18)
 * @value 18
 * @option TP再生率(1)～(11)(16)(17)(18)
 * @value 19
 * @option 目标率(1)～(11)(16)(17)(18)
 * @value 20
 * @option 防御効果率(1)～(11)(16)(17)(18)
 * @value 21
 * @option 恢复效果率(1)～(11)(16)(17)(18)
 * @value 22
 * @option 医学知识(1)～(11)(16)(17)(18)
 * @value 23
 * @option MP消費率(1)～(11)(16)(17)(18)
 * @value 24
 * @option TP率(1)～(11)(16)(17)(18)
 * @value 25
 * @option 物理伤害率(1)～(11)(16)(17)(18)
 * @value 26
 * @option 魔法伤害率(1)～(11)(16)(17)(18)
 * @value 27
 * @option 经验点(1)～(11)(18)
 * @value 30
 * @option 赚取金额(1)～(11)(18)
 * @value 31
 * @option 失败次数(1)～(11)(16)(18)
 * @value 32
 * @option 怪物名称(2)～(7)(9)(12)(18)
 * @value 33
 * @option 仅姓名(2)～(7)(9)(12)(18)
 * @value 35
 * @option 转弯（仅在TPB战斗中当前状态为ON时显示）(1)～(11)(18)
 * @value 36
 * @option 怪物图鉴号(2)～(7)(9)(18)
 * @value 37
 * @option 耐性属性(2)～(7)(9)(10)(11)(18)
 * @value 40
 * @option 弱点属性(2)～(7)(9)(10)(11)(18)
 * @value 41
 * @option 无效属性(2)～(7)(9)(10)(11)(18)
 * @value 42
 * @option 抵抗状态(2)～(7)(9)(10)(11)(18)
 * @value 45
 * @option 虚弱状态(2)～(7)(9)(10)(11)(18)
 * @value 46
 * @option 无效状态(2)～(7)(9)(10)(11)(18)
 * @value 47
 * @option 抗性减益(2)～(7)(9)(10)(11)(18)
 * @value 50
 * @option 虚弱减益(2)～(7)(9)(10)(11)(18)
 * @value 51
 * @option 掉落物品(2)～(7)(9)(10)(11)(18)
 * @value 60
 * @option 钢铁项目（要盗みスキルプラグイン）(2)～(7)(9)(10)(11)(18)
 * @value 61
 * @option 有条件的掉落物品（要条件付きドロップアイテムプラグイン）(2)～(7)(9)(10)(11)(18)
 * @value 62
 * @option 描述字段(1)～(7)(9)(10)(13)(18)
 * @value 70
 * @option 原始参数(1)～(11)(16)(18)
 * @value 80
 * @option 敌人使用技能(2)～(7)(9)(10)(11)(18)
 * @value 100
 * @option 属性雷达图(2)～(7)(9)(18)
 * @value 121
 * @option 状态雷达图(2)～(7)(9)(18)
 * @value 122
 * @option 怪物画像(3)～(7)(9)(15)
 * @value 200
 * @option 字符芯片(3)～(7)(9)
 * @value 201
 * @option 共通画像(3)～(7)(9)(14)(15)
 * @value 250
 * @option 个体怪物形象(3)～(7)(9)(13)(15)
 * @value 251
 * @option 页面切换(2)～(7)(9)(18)
 * @value 500
 * @option 线(2)～(7)(9)
 * @value 1000
 * @default 0
 * @parent BasicSetting
 * 
 * @param DetaEval
 * @desc 设置参数评估表达式。 de：怪物数据库数据 ge：怪物游戏数据
 * @text 参数评估公式（1）
 * @type combo[]
 * @option '$gameVariables.value(0);//游戏变量'
 * @option 'ge._race;//種族（要蒼竜氏バトラー種族定義）'
 * @option 'ge.sp;//取得SP（要うなぎおおとろ氏スキルツリー）'
 * @default 
 * @parent BasicSetting
 * 
 * @param NameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text 系统项文本颜色 (2)
 * @type number
 * @default 16
 * @min 0
 * @parent BasicSetting
 * 
 * @param X_Position
 * @text X表示列位置(3)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * @parent BasicSetting
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(4)
 * @type number
 * @default 1
 * @min 1
 * @parent BasicSetting
 * 
 * @param X_Coordinate
 * @text X座標（相対）(5)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(6)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @min -9999
 * @parent BasicSetting
 * 
 * @param ItemWidth
 * @desc 項目横幅（0で自動）
 * @text 項目横幅(7)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text 系统项宽度 (8)
 * @type number
 * @default 0
 * @min 0
 * @parent BasicSetting
 * 
 * @param WideMode
 * @desc 項目表示モード
 * @text 物品展示方式 (9)
 * @type select
 * @option １列表示
 * @value 1
 * @option ２列表示
 * @value 2
 * @option ３列表示（表示列数が３の時のみ）
 * @value 3
 * @default 1
 * @parent BasicSetting
 * 
 * @param MaskMode
 * @desc 注册绘本时，如果信息未通过破解分析，则隐藏状态。
 * @text 信息未注册状态显示（10）
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param Back
 * @text 内容背景展示 (11)
 * @desc コンテンツ背景を表示させます。
 * @type boolean
 * @default false
 * @parent BasicSetting
 * 
 * @param Decimal
 * @text 小数点桁数(17)
 * @desc 表示出来る小数点桁数。
 * @type number
 * @default 0
 * @min 0
 * @max 99
 * @parent BasicSetting
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text 字体大小 (18)
 * @type number
 * @default 0
 * @min -99
 * @parent BasicSetting
 * 
 * @param nameSetting
 * @text 名称、怪物名称设定
 * 
 * @param namePosition
 * @desc 名称、モンスター名の表示位置を指定します。
 * @text 名称、怪物名称显示位置（12）
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "raight"
 * @default "left"
 * @parent nameSetting
 * 
 * @param textSetting
 * @text 描述字段设置
 * 
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 描述字段标签名称 (13)
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param ImgSetting
 * @text 画像設定
 * 
 * @param ImgData
 * @desc 共通画像ファイル名を指定します。
 * @text 共通画像(14)
 * @type file[]
 * @dir img/
 * @default []
 * @parent ImgSetting
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅(15)
 * @type number
 * @default 8
 * @min 0
 * @parent ImgSetting
 * 
 * @param UnitSetting
 * @text 単位設定
 * 
 * @param paramUnit
 * @desc 単位を設定します。
 * @text 単位(16)
 * @type string
 * @default 
 * @parent UnitSetting
 * 
 */
/*~struct~AnalyzeSkill:
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text 最大页面显示栏
 * @type number
 * @default 4
 * @min 1
 * 
 * @param Mode
 * @desc 表示するアナライズ項目を指定します。
 * @text 分析项目规格
 * @type select
 * @option 同图鉴展示
 * @value 0
 * @option 表示項目設定１
 * @value 1
 * @option 表示項目設定２
 * @value 2
 * @option 表示項目設定３
 * @value 3
 * @default 0
 * 
 * @param ContentCols
 * @text 怪物信息项列数
 * @desc 怪物信息中物品栏的数量。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent EnemyInfoSetting
 * 
 * @param StatusGaugeVisible
 * @type boolean
 * @default true
 * @text 显示仪表
 * @desc 显示 HP 和 MP 计量器。
 * 
 * @param EnemyCurrentStatus
 * @type boolean
 * @default true
 * @text 敌人当前状态显示
 * @desc 显示敌人的当前状态。
 * 
 * @param AnalyzeMissMessage
 * @type string
 * @default %2分析失败。
 * @text 分析失败时的消息
 * @desc 分析失败时设置消息。
 * 
 * @param BuffColor
 * @desc バフ時の文字色。
 * @text 抛光时的字符颜色
 * @type number
 * @default 0
 * @max 999999
 * 
 * @param DebuffColor
 * @desc デバフ時の文字色。
 * @text debuff时的角色颜色
 * @type number
 * @default 0
 * @max 999999
 * 
 * 
 */
/*~struct~BookCategoryList:
 * 
 * @param CategoryName
 * @desc カテゴリー名を設定します。
 * @text 分类名称
 * @type string
 * 
 * @param CategoryKey
 * @desc カテゴリーのKeyを設定します。(all:全て表示)
 * @text 类别键
 * @type string
 */
/*~struct~PercentContentList:
 *
 * @param ContentName
 * @desc 名称。
 * @text 表示名称
 * @type string
 * @default 
 * 
 * @param ContentDate
 * @desc 表明
 * @text 名称、怪物名称显示位置
 * @type select
 * @option 完成度
 * @value 0
 * @option 遭遇
 * @value 1
 * @option 击败
 * @value 2
 * @option 信息登记
 * @value 3
 * @option 遭遇数
 * @value 11
 * @option 失败次数
 * @value 12
 * @option 注册信息数
 * @value 13
 * @default 0
 * @parent nameSetting
*
*/
var Imported = Imported || {};
Imported.NUUN_EnemyBook = true;
(() => {

const parameters = PluginManager.parameters('NUUN_EnemyBook');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));

const PercentContentLength = param.PercentWindowVisible && (param.PercentContent && param.PercentContent.length > 0);
param.PageSetting = param.PageSetting || [];
param.EnemyBookCategory = param.EnemyBookCategory || [];
const NRP_pLoopLR = PluginManager.parameters("NRP_LoopCursor").loopLR;
let ge = null;
let de = null;

//プラグインコマンド
const pluginName = "NUUN_EnemyBook";

PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
  if ($gameParty.inBattle()) {
    SceneManager._scene.commandEnemyBook();
  } else {
    SceneManager.push(Scene_EnemyBook);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyInfoOpen', args => {
  if ($gameParty.inBattle()) {
    SceneManager._scene.commandEnemyBookInfo();
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeFromEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.statusToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeStatusEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
  $gameSystem.completeEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
  $gameSystem.clearEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookAddDefeat', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addDefeat(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDefeat', args => {
  $gameSystem.resetDefeat(Number(args.enemyId));
});

PluginManager.registerCommand(pluginName, 'EnemyBookRegistration', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSwitches.setValue(Number(args.registrationSwitch), $gameSystem.isInEnemyBook($dataEnemies[enemyId]));
  } else {
    $gameSwitches.setValue(Number(args.registrationSwitch), false);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusRegistration', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSwitches.setValue(Number(args.statusRegistrationSwitch), $gameSystem.isInEnemyBookStatus($dataEnemies[enemyId]));
  } else {
    $gameSwitches.setValue(Number(args.statusRegistrationSwitch), false);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true, Number(args.dropListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false, Number(args.dropListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, true, Number(args.stealListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, false, Number(args.stealListId) > 0);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemy', args => {
  $gameSystem.defeatEnemyVar(Number(args.DefeatEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookEncounteredEnemy', args => {
  $gameSystem.encounteredEnemyVar(Number(args.EncounteredEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookCompleteRate', args => {
  $gameSystem.completeRateVariables(Number(args.CompleteRate));
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemySum', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.defeatEnemySumVar(enemyId, Number(args.DefeatEnemySum));
  }
});

PluginManager.registerCommand(pluginName, 'DorpItemAcquired', args => {
  $gameSystem.dorpItemAcquired(Number(args.DorpItemAcquiredswitch), Number(args.enemyId), Number(args.DorpItemAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'StealItemAcquired', args => {
  $gameSystem.stealItemAcquired(Number(args.StealAcquiredswitch), Number(args.enemyId), Number(args.stealAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'EnemyBookActionAdd', args => {
  $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookActionRemove', args => {
  $gameSystem.enemyBookActionList(Number(args.enemyId), Number(args.actionId) - 1, Number(args.actionId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookElementAdd', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookElementRemove', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookElementList(Number(args.enemyId), Number(args.elementId) - 1, Number(args.elementId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookStateAdd', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookStateRemove', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookStateList(Number(args.enemyId), Number(args.stateId) - 1, Number(args.stateId) > 0, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDebuffAdd', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDebuffRemove', args => {
  if (!Imported.NUUN_EnemyBookEX_1) {
    return;
  }
  $gameSystem.enemyBookDebuffList(Number(args.enemyId), Number(args.debuffId) - 1, Number(args.debuffId) > 0, false);
});

const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
  _DataManager_extractSaveContents.call(this, contents);
  $gameSystem.initEnemyBookNumber();
};

//Game_System
const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  _Game_System_initialize.call(this);
  this._enemyBookFlags = [];
  this._enemyBookStatusFlags = [];
  this._defeatNumber = [];
  this._itemDorps = [];
  this._condItemDorps = [];
  this._stealItem = [];
  this._enemyBookElementFlags = [];
  this._enemyBookStateFlags = [];
  this._enemyBookDebuffFlags = [];
  this._enemyBookActionFlags = [];
  this.initEnemyBookNumber();
  this.initCategoryEnemyBook();
};

Game_System.prototype.addToEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = true;
};

Game_System.prototype.addStatusToEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = true;
};

Game_System.prototype.categoryToEnemyBook = function(enemy) {
  if (enemy && this.isInEnemyBook(enemy)) {
    const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : [];
    for (key of enemyCategory) {
      const index = param.EnemyBookCategory.findIndex(category => category.CategoryKey === key);
      if (index >= 0) {
        this._enemyBookCategoryFlags[index] = true;
      }
    }
  }
};

Game_System.prototype.getCategoryEnemyBook = function(index) {
  return this._enemyBookCategoryFlags[index];
};

Game_System.prototype.initCategoryEnemyBook = function() {
  this._enemyBookCategoryFlags = [];
  const enemyBookCategoryLength = param.EnemyBookCategory.length;
  for (let i = 0; i < enemyBookCategoryLength; i++) {
    this._enemyBookCategoryFlags[i] = false;
  }
  const index = param.EnemyBookCategory.findIndex(category => category.CategoryKey === 'all');
  if (index >= 0) {
    this._enemyBookCategoryFlags[index] = true;
  }
};

Game_System.prototype.statusToEnemyBook = function(enemyId) {
  this.addToEnemyBook(enemyId);
  this.addStatusToEnemyBook(enemyId);
};

Game_System.prototype.removeEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = false;
};

Game_System.prototype.removeStatusEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = false;
};

Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if(this._enemyBookFlags) {
    this.removeEnemyBook(enemyId);
    this.removeStatusEnemyBook(enemyId);
    this.dropItemListFlag(enemyId, 0, false, false);
    this.stealItemListFlag(enemyId, 0, false, false);
    this.enemyBookActionList(enemyId, 0, false, false);
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(enemyId, 0, false, false);
      this.enemyBookStateList(enemyId, 0, false, false);
      this.enemyBookDebuffList(enemyId, 0, false, false);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(enemyId, 0, false, false);
    }
    if (!this._defeatNumber) {
      this.clearDefeat();
    }
    this._defeatNumber[enemyId] = 0;
  }
};

Game_System.prototype.clearEnemyBookFlags = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.clearEnemyBookStatusFlags = function() {
  this._enemyBookStatusFlags = [];
};

Game_System.prototype.clearEnemyBook = function() {
  this.clearEnemyBookFlags();
  this.clearEnemyBookStatusFlags();
  this.clearDefeat();
  this.clearDropItem();
  this.clearStealItem();
  this.clearEnemyBookAction();
  if (Imported.NUUN_EnemyBookEX_1) {
    this.clearEnemyBookElement();
    this.clearEnemyBookState();
    this.clearEnemyBookDebuff();
  }
  if (Imported.NUUN_EnemyBookEX_2) {
    this.clearCondDropItem();
  }
};

Game_System.prototype.completeEnemyBook = function() {
  //this.clearEnemyBook();
  for (let i = 1; i < $dataEnemies.length; i++) {
    this.addToEnemyBook(i);
    this.addStatusToEnemyBook(i);
    this.dropItemListFlag(i, 0, true, false);
    this.stealItemListFlag(i, 0, true, false);
    this.enemyBookActionList(i, 0, false, true);
    if (Imported.NUUN_EnemyBookEX_1) {
      this.enemyBookElementList(i, 0, false, true);
      this.enemyBookStateList(i, 0, false, true);
      this.enemyBookDebuffList(i, 0, false, true);
    }
    if (Imported.NUUN_EnemyBookEX_2) {
      this.condDropItemListFlag(i, 0, true, false);
    }
  }
};

Game_System.prototype.getEnemyBookFlag = function(enemyId) {
  return this._enemyBookFlags[enemyId];
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  return enemy && enemy.name && this._enemyBookFlags && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.isInEnemyBookStatus = function(enemy) {
  return enemy && enemy.name && this._enemyBookStatusFlags && this._enemyBookStatusFlags[enemy.id];
};

Game_System.prototype.completeRateVariables = function(val) {
  const rate = this.completeRate();
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.completeRate = function() {
  return this.onStatusEnemyDate() / this.bookEnemyDate() * 100;
};

Game_System.prototype.isEnemyBook = function(enemy) {//データベース
  return enemy && enemy.name && !enemy.meta.NoBook && !enemy.meta.NoBookData;
};

Game_System.prototype.bookEnemyDate = function() {
  return $dataEnemies.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.onStatusEnemyDate = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  return enemy.reduce((r, enemy) => {
    return r + (this.isEnemyBook(enemy) && this.isInEnemyBookStatus(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.clearDefeat = function() {
	this._defeatNumber = [];
};

Game_System.prototype.defeatCount = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  this._defeatNumber[enemyId] = this._defeatNumber[enemyId] || 0;
  this._defeatNumber[enemyId]++;
};

Game_System.prototype.defeatNumber = function(enemyId) {
  if(this._defeatNumber && this._defeatNumber[enemyId]) {
    return this._defeatNumber[enemyId];
  }
  return 0;
};

Game_System.prototype.setDefeatEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._defeatEnemy = enemy.reduce((r, enemy) => {
    return r + (enemy && enemy.name && (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook && !enemy.meta.NoBook && !enemy.meta.NoBookData) ? 1 : 0);
  }, 0);
};

Game_System.prototype.defeatEnemy = function(enemyList) {
  this.setDefeatEnemy(enemyList);
  return this._defeatEnemy;
};

Game_System.prototype.defeatEnemyVar = function(val) {
  this.setDefeatEnemy();
  $gameVariables.setValue(val, this._defeatEnemy);
};

Game_System.prototype.defeatEnemySumVar = function(enemy, val) {
  $gameVariables.setValue(val, this.defeatNumber(enemy));
};

Game_System.prototype.addDefeat = function(enemy) {
  if (this.defeatNumber(enemy) <= 0) {
    this.defeatCount(enemy);
  }
};

Game_System.prototype.resetDefeat = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  if (enemyId > 0) {
    if(this._defeatNumber[enemyId]) {
      this._defeatNumber[enemyId] = 0;
    }
  } else {
    for(let i = 1; $dataEnemies.length > i; i++) {
      this._defeatNumber[i] = 0;
    }
  }
};

Game_System.prototype.setEncounteredEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._EncounteredEnemy = enemy.reduce((r ,enemy) => {
    return r + (this.encounteredEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.encounteredEnemy = function(enemyList) {
  this.setEncounteredEnemy(enemyList);
  return this._EncounteredEnemy;
};

Game_System.prototype.encounteredEnemyVar = function(val) {
  this.setEncounteredEnemy();
  $gameVariables.setValue(val, this._EncounteredEnemy);
};

Game_System.prototype.encounteredEnemyBook = function(enemy) {
  return this.isEnemyBook(enemy) && this.isInEnemyBook(enemy);
};

Game_System.prototype.clearDropItem = function() {
	this._itemDorps = [];
};

Game_System.prototype.setDropItemFlag = function(enemyId, dropId, flag) {
  if (!param.ShowDropItemName) {
    return;
  }
	if (!this._itemDorps) {
		this.clearDropItem();
  }
  this._itemDorps[enemyId] = this._itemDorps[enemyId] || [];
  this._itemDorps[enemyId][dropId] = flag;
};

Game_System.prototype.getDropItemFlag = function(enemyId, dropId) {
  if(!this._itemDorps || !this._itemDorps[enemyId] || !this._itemDorps[enemyId][dropId]) {
    return false;
  }
  return this._itemDorps[enemyId][dropId];
};

Game_System.prototype.clearStealItem = function() {
	this._stealItem = [];
};

Game_System.prototype.setStealItemFlag = function(enemyId, stealId, flag) {
  if (!param.ShowStealItemName) {
    return;
  }
	if (!this._stealItem) {
		this.clearStealItem();
  }
  this._stealItem[enemyId] = this._stealItem[enemyId] || [];
  this._stealItem[enemyId][stealId] = flag;
};

Game_System.prototype.getStealItemFlag = function(enemyId, stealId) {
  if(!this._stealItem || !this._stealItem[enemyId] || !this._stealItem[enemyId][stealId]) {
    return false;
  }
  return this._stealItem[enemyId][stealId];
};

Game_System.prototype.dropItemListFlag = function(enemyId, dropListId, mode, Individual) {
	if(enemyId > 0){
    if(Individual){
      this.setDropItemFlag(enemyId, dropListId, mode);
    } else {
      let itemList = $dataEnemies[enemyId].dropItems;
       for(let i = 0; itemList.length > i; i++){
        this.setDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.stealItemListFlag = function(enemyId, stealListId, mode, Individual) {
	if(enemyId > 0){
    if(Individual){
      this.setStealItemFlag (enemyId, stealListId, mode);
    } else {
      const enemy = $dataEnemies[enemyId];
      const itemList = (Imported.NUUN_StealableItems ? this.getStealList(enemy) : null);
      if(itemList) {
        for(let i = 0; itemList.length > i; i++){
          this.setStealItemFlag(enemyId, i, mode);
        }
      }
    }
  }
};

Game_System.prototype.dorpItemAcquired = function(switchId, enemyId, dropId) {
  if (dropId > 0) {
    drop = this.getDropItemFlag(enemyId, dropId);
  } else {
    drop = false;
    const itemList = $dataEnemies[enemyId].dropItems;
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        if (itemList[i].kind > 0) {
          drop = this.getDropItemFlag(enemyId, i);
          if (!drop) {
            break;
          }
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, drop);
  } else {
    return drop;
  }
};

Game_System.prototype.stealItemAcquired = function(switchId, enemyId, stealId) {
  if (stealId > 0) {
    steal = this.getStealItemFlag(enemyId, stealId);
  } else {
    steal = false;
    const itemList = this.getStealList($dataEnemies[enemyId]);
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        steal = this.getStealItemFlag(enemyId, stealId);
        if (!steal) {
          break;
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, steal);
  } else {
    return steal;
  }
};

Game_System.prototype.registrationTiming = function() {
  return param.RegistrationTiming;
};

Game_System.prototype.registrationStatusTiming = function() {
  return param.RegistrationStatusTiming;
};

Game_System.prototype.getStealList = function(enemy) {
  const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const stealItems = [];
	while(true) {
		let match = re.exec(enemy.note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
				case 'M':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:4});
					break;
			}
		} else {
			return stealItems;
		}
	}
};

Game_System.prototype.clearEnemyBookAction = function() {
	this._enemyBookActionFlags = [];
};

Game_System.prototype.setEnemyBookActionFlag = function(enemyId, actionId, flag) {
  if (!param.ShowActionName) {
    return;
  }
	if (!this._enemyBookActionFlags) {
		this.clearEnemyBookAction();
  }
  this._enemyBookActionFlags[enemyId] = this._enemyBookActionFlags[enemyId] || [];
  this._enemyBookActionFlags[enemyId][actionId] = flag;
};

Game_System.prototype.getEnemyBookActionFlag = function(enemyId, actionId) {
  if(!this._enemyBookActionFlags || !this._enemyBookActionFlags[enemyId] || !this._enemyBookActionFlags[enemyId][actionId]) {
    return false;
  }
  return this._enemyBookActionFlags[enemyId][actionId];
};

Game_System.prototype.enemyBookActionList = function(enemyId, actionId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookActionFlag(enemyId, actionId, mode);
    } else {
      const action = $dataEnemies[enemyId].actions;
      for(let i = 0; action.length > i; i++){
        this.setEnemyBookActionFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookElement = function() {
	this._enemyBookElementFlags = [];
};

Game_System.prototype.setEnemyBookElementFlag = function(enemyId, elementId, flag) {
	if (!this._enemyBookElementFlags) {
		this.clearEnemyBookElement();
  }
  this._enemyBookElementFlags[enemyId] = this._enemyBookElementFlags[enemyId] || [];
  this._enemyBookElementFlags[enemyId][elementId] = flag;
};

Game_System.prototype.getEnemyBookElementFlag = function(enemyId, elementId) {
  if(!this._enemyBookElementFlags || !this._enemyBookElementFlags[enemyId] || !this._enemyBookElementFlags[enemyId][elementId]) {
    return false;
  }
  return this._enemyBookElementFlags[enemyId][elementId];
};

Game_System.prototype.enemyBookElementList = function(enemyId, elementId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookElementFlag(enemyId, elementId, mode);
    } else {
      const list = param.ElementList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookElementFlag(enemyId, list[i].ElementNo - 1, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookState = function() {
	this._enemyBookStateFlags = [];
};

Game_System.prototype.setEnemyBookStateFlag = function(enemyId, stateId, flag) {
	if (!this._enemyBookStateFlags) {
		this.clearEnemyBookState();
  }
  this._enemyBookStateFlags[enemyId] = this._enemyBookStateFlags[enemyId] || [];
  this._enemyBookStateFlags[enemyId][stateId] = flag;
};

Game_System.prototype.getEnemyBookStateFlag = function(enemyId, stateId) {
  if(!this._enemyBookStateFlags || !this._enemyBookStateFlags[enemyId] || !this._enemyBookStateFlags[enemyId][stateId]) {
    return false;
  }
  return this._enemyBookStateFlags[enemyId][stateId];
};

Game_System.prototype.enemyBookStateList = function(enemyId, stateId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookStateFlag(enemyId, stateId, mode);
    } else {
      const list = param.StateList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookStateFlag(enemyId, list[i].StateId, mode);
      }
    }
  }
};

Game_System.prototype.clearEnemyBookDebuff = function() {
	this._enemyBookDebuffFlags = [];
};

Game_System.prototype.setEnemyBookDebuffFlag = function(enemyId, debuffId, flag) {
	if (!this._enemyBookDebuffFlags) {
		this.clearEnemyBookDebuff();
  }
  this._enemyBookDebuffFlags[enemyId] = this._enemyBookDebuffFlags[enemyId] || [];
  this._enemyBookDebuffFlags[enemyId][debuffId] = flag;
};

Game_System.prototype.getEnemyBookDebuffFlag = function(enemyId, debuffId) {
  if(!this._enemyBookDebuffFlags || !this._enemyBookDebuffFlags[enemyId] || !this._enemyBookDebuffFlags[enemyId][debuffId]) {
    return false;
  }
  return this._enemyBookDebuffFlags[enemyId][debuffId];
};

Game_System.prototype.enemyBookDebuffList = function(enemyId, debuffId, Individual, mode) {
  if (enemyId > 0) {
    if (Individual) {
      this.setEnemyBookDebuffFlag(enemyId, debuffId, mode);
    } else {
      const list = param.DeBuffList;
      for(let i = 0; list.length > i; i++){
        this.setEnemyBookDebuffFlag(enemyId, list[i].ParamId, mode);
      }
    }
  }
};

Game_System.prototype.initEnemyBookNumber = function() {
  this._enemyBookNumber = [];
  let index = 0;
  for (enemy of $dataEnemies) {
    if (enemy && this.isEnemyBook(enemy)) {
      index++;
      this._enemyBookNumber.push(index);
    } else {
      this._enemyBookNumber.push(-1);
    }
  }
  this._enemyBookLength = index;
};

Game_System.prototype.addToEnemyBookNumber = function(enemyId, index) {
  if(!this._enemyBookNumber) {
    this._enemyBookNumber = [];
  }
  this._enemyBookNumber[enemyId] = index;
};

Game_System.prototype.getEnemyBookNumber = function(enemyId) {
  return enemyId === 0 ? this._enemyBookNumber : this._enemyBookNumber[enemyId];
};

//Game_Troop
const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  for (const enemy of this.members()) {
    if (enemy.isAppeared()) {
      const enemyId = enemy.enemyId();
      if ($gameSystem.registrationStatusTiming() === 0) {
        if (!$gameSystem.getEnemyBookFlag(enemyId)) {
          $gameSystem.addToEnemyBook(enemyId);
        }
        $gameSystem.addStatusToEnemyBook(enemyId);
      } else if ($gameSystem.registrationTiming() === 0) {
        $gameSystem.addToEnemyBook(enemyId);
      }
    }
  }
};

//Game_Enemy
const _Game_Enemy_appear = Game_Enemy.prototype.appear;
Game_Enemy.prototype.appear = function() {
  _Game_Enemy_appear.call(this);
  const enemyId = this.enemyId();
  if ($gameTroop.inBattle()) {
    if ($gameSystem.registrationStatusTiming() === 0) {
      if (!$gameSystem.getEnemyBookFlag(enemyId)) {
        $gameSystem.addToEnemyBook(enemyId);
      }
      $gameSystem.addStatusToEnemyBook(enemyId);
    } else if ($gameSystem.registrationTiming() === 0) {
      $gameSystem.addToEnemyBook(enemyId);
    }
  } else {
    if ($gameSystem.registrationStatusTiming() === 4) {
      if (!$gameSystem.getEnemyBookFlag(enemyId)) {
        $gameSystem.addToEnemyBook(enemyId);
      }
      $gameSystem.addStatusToEnemyBook(enemyId);
    } else if ($gameSystem.registrationTiming() === 4) {
      $gameSystem.addToEnemyBook(enemyId);
    }
  }
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
  if (param.TransformDefeat && !this.enemy().meta.NoTransformInData) {
    $gameSystem.defeatCount(enemyId);
    if ($gameSystem.registrationStatusTiming() !== 2) {
      if (!$gameSystem.getEnemyBookFlag(enemyId)) {
        $gameSystem.addToEnemyBook(enemyId);
      }
      $gameSystem.addStatusToEnemyBook(enemyId);
    }
  }
  _Game_Enemy_transform.call(this, enemyId);
  if ($gameSystem.registrationStatusTiming() === 0) {
    if (!$gameSystem.getEnemyBookFlag(enemyId)) {
      $gameSystem.addToEnemyBook(enemyId);
    }
    $gameSystem.addStatusToEnemyBook(enemyId);
  } else if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(enemyId);
  }
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
  _Game_Enemy_die.call(this);
  const enemyId = this.enemyId();
  if ($gameSystem.registrationStatusTiming() === 1 || $gameSystem.registrationStatusTiming() === 3) {
    if (!$gameSystem.getEnemyBookFlag(enemyId)) {
      $gameSystem.addToEnemyBook(enemyId);
    }
    $gameSystem.statusToEnemyBook(enemyId);
  } else if ($gameSystem.registrationTiming() === 1 || $gameSystem.registrationTiming() === 3) {
    $gameSystem.addToEnemyBook(enemyId);
  }
  $gameSystem.defeatCount(enemyId);
};

Game_Enemy.prototype.dropItemFlag = function(drop) {
  let di = this.enemy().dropItems;
  for (let i = 0; i < drop.length; i++){
    for(let r = 0; r < di.length; r++){
      if(drop[i].id === di[r].dataId){
        switch (di[r].kind) {
        case 1:
          if(DataManager.isItem(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 2:
          if(DataManager.isWeapon(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 3:
          if(DataManager.isArmor(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        }
      }
    }
  }
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
  const drop = _Game_Enemy_makeDropItems.call(this);
  this.dropItemFlag(drop);
  return drop;
};

Game_Enemy.prototype.stealItemFlag = function() {
  const enemyId = this._enemyId;
  const number = $gameSystem._stealIndex;
  $gameSystem.setStealItemFlag(enemyId, number, true);
};

const _Game_Enemy_makeStealItems = Game_Enemy.prototype.makeStealItems;
Game_Enemy.prototype.makeStealItems = function(rate, mode) {
  const di = _Game_Enemy_makeStealItems.call(this, rate, mode)
  if(mode === 1 && di){
    this.stealItemFlag();
  }
  return di;
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  this.analyzeSkill(target);
};

Game_Action.prototype.analyzeSkill = function(target) {
  if (target.isEnemy()) {
    const data = this.item().meta.AnalyzeSkill ? this.item().meta.AnalyzeSkill.split(',').map(Number) : [-1];
    if (data[0] > 0) {//0以上ならアナライズ発動
      this._analyzeDate = param.AnalyzeSkillMode[data[0] - 1];
      if (this._analyzeDate) {
        target.result().analyzeSkill = true;
        const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
        if (Math.floor(Math.random() * 100 >= rate) || target.enemy().meta.NoBookData) {
          target.result().missed = true;
          BattleManager.analyzeMissMessage = this._analyzeDate.AnalyzeMissMessage.format(target.name(), this.subject().name());
          return;
        }
        this.makeSuccess(target);
        BattleManager.analyzeTarget = target;
        SceneManager._scene.enemyBookEnemyAnalyze(this._analyzeDate);
      }
    } else if (data[0] === 0 && data[1] > 0) {
      target.result().analyzeSkill = true;
      const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
      if (Math.floor(Math.random() * 100 >= rate) || target.enemy().meta.NoBookData) {
        target.result().missed = true;
        BattleManager.analyzeMissMessage = this._analyzeDate.AnalyzeMissMessage.format(target.name(), this.subject().name());
        return;
      }
      this.makeSuccess(target);
      $gameVariables.setValue(param.CommonVariableID,target.enemy().id)
      $gameTemp.reserveCommonEvent(data[1]);
    }
  }
};

Game_Action.prototype.c_AnalyzeSkill = function(target) {
  if (target.isEnemy()) {
    const id = this.item().meta.C_AnalyzeSkill ? Number(this.item().meta.AnalyzeSkill) : 0;
    if (id > 0) {
      target.result().analyzeSkill = true;
    }
  }

  if (target.isEnemy()) {
    this._analyzeDate = this.item().meta.AnalyzeSkill ? param.AnalyzeSkillMode[Number(this.item().meta.AnalyzeSkill) - 1] : null;
    if (this._analyzeDate) {
      target.result().analyzeSkill = true;
      const rate = this.item().meta.CertainAnalyze || !target.enemy().meta.AnalyzeResist ? 100 : Number(target.enemy().meta.AnalyzeResist);
      if (Math.floor(Math.random() * 100 >= rate) || target.enemy().meta.NoBookData) {
        target.result().missed = true;
        BattleManager.analyzeMissMessage = this._analyzeDate.AnalyzeMissMessage.format(target.name(), this.subject().name());
        return;
      }
      BattleManager.analyzeTarget = target;
      SceneManager._scene.enemyBookEnemyAnalyze(this._analyzeDate);
    }
  }
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
  _Game_ActionResult_clear.call(this);
  this.analyzeSkill = false;
};

//Scene_Menu
const _Scene_Menu_createCommandWindow =　Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

Scene_Menu.prototype.commandEnemyBook = function() {
  SceneManager.push(Scene_EnemyBook);
};

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  _Window_MenuCommand_addOriginalCommands.call(this);
  if(param.ShowCommand && ($gameSwitches.value(param.enemyBookSwitch) || param.enemyBookSwitch === 0)) {
    this.addCommand(param.CommandName, "enemyBook");
  }
};


//Scene_EnemyBook
function Scene_EnemyBook() {
  this.initialize(...arguments);
}

Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;

Scene_EnemyBook.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
  this._backGroundImg = null;
};

Scene_EnemyBook.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createPercentWindow();
  this.createIndexWindow();
  this.createEnemyPageWindow();
  this.createEnemyWindow();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createCategoryNameWindow();
    this.createCategoryWindow();
    this.enemyCategorySelection();
  } else {
    this.enemyIndexSelection();
  }
};

Scene_EnemyBook.prototype.createIndexWindow = function() {
  const rect = this.indexWindowRect();
  this._indexWindow = new Window_EnemyBook_Index(rect);
  this._indexWindow.setHandler("cancel", this.onEnemyIndexCancel.bind(this));
  this.addWindow(this._indexWindow);
  this._indexWindow.setPercentWindow(this._percentWindow);
  this._indexWindow.activate();
  this._indexWindow.hide();
  if (param.EnemyBookBackGround) {
    this._indexWindow.opacity = 0;
    this._indexWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryNameWindow = function() {
  const rect = this.categoryNameWindowRect();
  this._categoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.addWindow(this._categoryNameWindow);
  if (param.EnemyBookBackGround) {
    this._categoryNameWindow.opacity = 0;
    this._categoryNameWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryWindow = function() {
  const rect = this.indexWindowRect();
  this._categoryWindow = new Window_EnemyBook_Category(rect);
  this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
  this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
  this._categoryWindow.hide();
  this._indexWindow.setCategoryWindow(this._categoryWindow);
  this._categoryNameWindow.setCategoryWindow(this._categoryWindow);
  if (param.EnemyBookBackGround) {
    this._categoryWindow.opacity = 0;
    this._categoryWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentWindowRect();
    this._percentWindow = new Window_EnemyBook_Percent(rect);
    this.addWindow(this._percentWindow);
    if (param.EnemyBookBackGround) {
      this._percentWindow.opacity = 0;
      this._percentWindow.frameVisible = false;
    }
  }
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
  const rect = this.enemyWindowRect();
  this._enemyWindow = new Window_EnemyBook(rect);
  this.addWindow(this._enemyWindow);
  this._indexWindow.setEnemyWindow(this._enemyWindow);
  this._enemyPageWindow.setEnemyWindow(this._enemyWindow);
  this._indexWindow.select(Window_EnemyBook_Index._lastIndex);
  if (param.EnemyBookBackGround) {
    this._enemyWindow.opacity = 0;
    this._enemyWindow.frameVisible = false;
  }
  this.setMaxPage(param.PageSetting);
};

Scene_EnemyBook.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyWindowPageRect();
  this._enemyPageWindow = new Window_EnemyBookPageCategory(rect);
  this.addWindow(this._enemyPageWindow);
  if (param.EnemyBookBackGround) {
    this._enemyPageWindow.opacity = 0;
    this._enemyPageWindow.frameVisible = false;
  }
  this._enemyPageWindow.setPageList(param.PageSetting, param.PageCols);
  if (param.PageSetting.length <= 1) {
    this._enemyPageWindow.height = 0;
    this._enemyPageWindow.hide();
  } else if (!param.PageWindowsShow) {
    this._enemyPageWindow.y -= (Graphics.height - Graphics.boxHeight) / 2 + this._enemyPageWindow.height + this.mainAreaTop();
  }
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop();
  const ww = this.indexWidth();
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
  const wx = param.WindowMode === 0 ? this.indexWidth() : 0;
  const wy = this.mainAreaTop();
  const ww = this.enemyWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
  const height = this.percentWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + height;
  const ww = this.indexWidth();
  const wh = this.mainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
  const wx = param.WindowMode === 0 ? this.indexWidth() : 0;
  const wy = this.mainAreaTop() + (param.PageWindowsShow ? this._enemyPageWindow.height : 0);
  const ww = this.enemyWindowWidth();
  const wh = this.mainAreaHeight() - (param.PageWindowsShow ? this._enemyPageWindow.height : 0);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + this.percentWindowRect().height;
  const ww = this.indexWidth();
  const wh = this.calcWindowHeight(1, true);
  this._indexWindow.y += wh;
  this._indexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
  return Graphics.boxWidth - this.indexWidth();
};

Scene_EnemyBook.prototype.helpAreaHeight = function() {
  return 0;
};

Scene_EnemyBook.prototype.indexWidth = function() {
  return param.BookWidth > 0 ? Graphics.boxWidth - param.BookWidth : Math.floor(Graphics.boxWidth / 3);
};


Scene_EnemyBook.prototype.setMaxPage = function(page) {
  page = page || [];
  this._maxPage = page.length;
  this._enemyWindow.displayList = page;
};

Scene_EnemyBook.prototype.getMaxPage = function() {
  return this._maxPage;
};

const _Scene_EnemyBook_createBackground = Scene_EnemyBook.prototype.createBackground;
Scene_EnemyBook.prototype.createBackground = function() {
  Scene_MenuBase.prototype.createBackground.call(this);
  if (param.EnemyBookBackGround) {
    const sprite = new Sprite();
    sprite.bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg[0]);
    this.addChild(sprite);
    this._backGroundImg = sprite;
    sprite.x = param.BackUiWidth ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 : 0;
    sprite.y = param.BackUiWidth ? (Graphics.height - (Graphics.boxHeight + 8)) / 2 : 0;
  }
};

Scene_EnemyBook.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
  if (this._backGroundImg && $gameTemp.backGroundEbookRefresh) {
    $gameTemp.backGroundEbookRefresh = false;
    const sprite = this._backGroundImg;
    const bitmapId = this._enemyWindow.getBackgroundId();
    bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg[bitmapId]);
    if (!bitmap.isReady()) {
      bitmap.addLoadListener(this.setBackground.bind(this, sprite, bitmap)); 
    } else {
      this.setBackground(sprite, bitmap);
    }
  }
};

Scene_EnemyBook.prototype.setBackground = function(sprite, bitmap) {
  sprite.bitmap = bitmap;
  if(param.BackUiWidth) {
    sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};

Scene_EnemyBook.prototype.onEnemyIndexCancel = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyCategorySelection();
  } else {
    this.popScene();
  }
};

Scene_EnemyBook.prototype.onCategoryOk = function() {
  this.enemyIndexSelection();
  this._indexWindow.setCategory();
  this._indexWindow.refresh();
};

Scene_EnemyBook.prototype.enemyIndexSelection = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._categoryWindow.hide();
    this._categoryWindow.deselect();
    this._categoryWindow.deactivate();
    this._categoryNameWindow.setName(this._categoryWindow.index());
  }
  this._indexWindow.show();
  this._indexWindow.activate();
  this._enemyPageWindow.setPage();
  this._enemyPageWindow.activate();
};

Scene_EnemyBook.prototype.enemyCategorySelection = function() {
  this._categoryWindow.setSelect();
  this._categoryWindow.show();
  this._indexWindow.hide();
  this._categoryWindow.activate();
  this._indexWindow.deselect();
  this._indexWindow.deactivate();
  this._enemyPageWindow.deselect();
  this._enemyPageWindow.deactivate();
  this._enemyPageWindow.itemClear();
};


//Window_EnemyBook_Percent
function Window_EnemyBook_Percent() {
  this.initialize(...arguments);
}

Window_EnemyBook_Percent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Percent.prototype.constructor = Window_EnemyBook_Percent;

Window_EnemyBook_Percent.prototype.initialize = function(rect) {
  this._userWindowSkin = param.PercentWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._defeat = {};
  this._encountered = {};
  this._duration = 0;
  this._oy = 0;
  this._percentContent = param.PercentContent || [];
  this._percentContentLength = this._percentContent.length;
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
  this._enemyListLength = enemyList.length;
  this.defeatPercent(enemyList);
  this.encounteredPercent(enemyList);
  //this.registrationPercent(enemyList);
  this.refresh();
};

Window_EnemyBook_Percent.prototype.defeatPercent = function(enemyList) {
  this._defeat.length = enemyList.length;
  this._defeat.encNum = $gameSystem.defeatEnemy(enemyList);
  this._defeat.onStatus = $gameSystem.onStatusEnemyDate(enemyList);
  this._defeat.Percent = Math.floor(this._defeat.encNum / this._defeat.length * 100);
  this._defeat.complete = Math.floor(this._defeat.onStatus / this._defeat.length * 100);
};

Window_EnemyBook_Percent.prototype.encounteredPercent = function(enemyList) {
  this._encountered.encNum = $gameSystem.encounteredEnemy(enemyList);
  //this._encountered.Percent = Math.floor(this._encountered.encNum / enemyList.length * 100);
  this._encountered.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.registrationPercent = function(enemyList) {
  this.registration.encNum = $gameSystem.registrationEnemy(enemyList);
};

Window_EnemyBook_Percent.prototype.refresh = function() {
  const lineHeight = this.lineHeight();
  const rect = this.itemLineRect(0);
  let y = rect.y + (this._oy * -1);
  this.contents.clear();
  for (const content of this._percentContent) {
    const text = this.getParam(content);
    this.drawText(text, rect.x, y, rect.width, 'center');
    y += lineHeight;
  }
  const text = this.getParam(this._percentContent[0]);
  this.drawText(text, rect.x, y, rect.width, 'center');
};

Window_EnemyBook_Percent.prototype.getParam = function(content) {
  switch (content.ContentDate) {
    case 0:
      return content.ContentName +' : '+ this._defeat.complete +' %';
    case 1:
      return content.ContentName +' : '+ this._encountered.encNum +'/'+ this._encountered.length;
    case 2:
      return content.ContentName +' : '+ this._defeat.encNum +'/'+ this._defeat.length;
    case 11:
      return content.ContentName +' : '+ this._encountered.encNum;
    case 12:
      return content.ContentName +' : '+ this._defeat.encNum;
    case 13:
      return content.ContentName +' : '+ this._defeat.onStatus;
  }
};

Window_EnemyBook_Percent.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this._percentContentLength > 1) {
    this._duration++;
    this.updateInterval();
  }
};

Window_EnemyBook_Percent.prototype.updateInterval = function() {
  const lineHeight = this.lineHeight();
  if(this._duration >= param.Interval && this._duration < param.Interval + lineHeight){
    this._oy++;
    this.refresh();
  }
  if(this._duration >= param.Interval + lineHeight){
    this._duration = 0;
    if(this._oy >= lineHeight * this._percentContentLength){
       this._oy = 0;
    }
  }
};

//Window_EnemyBook_CategoryName
function Window_EnemyBook_CategoryName() {
  this.initialize(...arguments);
}

Window_EnemyBook_CategoryName.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_CategoryName.prototype.constructor = Window_EnemyBook_CategoryName;

Window_EnemyBook_CategoryName.prototype.initialize = function(rect) {
  this._userWindowSkin = param.CategoryNameWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryName = null;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.setName = function() {
  const name = this._categoryWindow.getList()[this._categoryWindow._categorySelect].CategoryName;
  this._categoryName = name;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.contents.clear();
  this.drawText(this._categoryName, rect.x, rect.y, rect.width);
};

Window_EnemyBook_CategoryName.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};


//Window_EnemyBook_Category
function Window_EnemyBook_Category() {
  this.initialize(...arguments);
}

Window_EnemyBook_Category.prototype = Object.create(Window_Command.prototype);
Window_EnemyBook_Category.prototype.constructor = Window_EnemyBook_Category;

Window_EnemyBook_Category.prototype.initialize = function(rect) {
  this._userWindowSkin = param.CategoryWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryList = param.EnemyBookCategory || [];
  this._categorySelect = 0;
  this.setCategoryFlags();
  this._maxNum = param.CategoryVisibleType === 1 ? this.maxItemsVisible() : (this._categoryList ? this._categoryList.length : 0);
  this.select(this._categorySelect);
  this.refresh();
};

Window_EnemyBook_Category.prototype.setCategoryFlags = function() {
  $gameSystem.initCategoryEnemyBook();
  for (enemy of $dataEnemies) {
    $gameSystem.categoryToEnemyBook(enemy);
  }
};

Window_EnemyBook_Category.prototype.isCurrentItemEnabled = function() {
  return param.CategoryVisibleType === 2 ? $gameSystem.getCategoryEnemyBook(this.index()) : true;
};

Window_EnemyBook_Category.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Category.prototype.maxItems = function() {
  return this._maxNum;
};

Window_EnemyBook_Category.prototype.maxItemsVisible = function() {
  const categoryLength = this._categoryList.length;
  this._newCategoryList = [];
  let num = 0;
  for (let i = 0; i < categoryLength; i++) {
    const result = $gameSystem.getCategoryEnemyBook(i);
    if (result) {
      this._newCategoryList.push({CategoryName : this._categoryList[i].CategoryName, CategoryKey: this._categoryList[i].CategoryKey, categoryVisible : result});
      num++;
    }
  }
  return num;
};

Window_EnemyBook_Category.prototype.processOk = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processOk.call(this);
};

Window_EnemyBook_Category.prototype.processCancel = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_Category.prototype.getDate = function(index) {
  return param.CategoryVisibleType === 1 ? this._newCategoryList[index].category : this._categoryList[index];
};

Window_EnemyBook_Category.prototype.getList = function() {
  return param.CategoryVisibleType === 1 ? this._newCategoryList : this._categoryList;
};

Window_EnemyBook_Category.prototype.getCategoryVisible = function(index) {
  return param.CategoryVisibleType === 1 ? this._newCategoryList[index].categoryVisible : $gameSystem.getCategoryEnemyBook(index);
};

Window_EnemyBook_Category.prototype.makeCommandList = function() {
  const list = this.getList();
  list.forEach((command, i) => {
    let categoryName = command.CategoryName;
    let enabled = true;
    const result = this.getCategoryVisible(i);
    if (param.CategoryVisibleType === 2 && !result) {
      categoryName = this.unknownDataLength(categoryName);
      enabled = false;
    }
    if (param.CategoryVisibleType === 1 && !result) {

    } else {
      this.addCommand(categoryName, command.CategoryKey, enabled);
    }
  });
};

Window_EnemyBook_Category.prototype.unknownDataLength = function(name) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = name.length;
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
};

Window_EnemyBook_Category.prototype.setSelect = function() {
  this.select(this._categorySelect);
};

Window_EnemyBook_Category.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBook_Category.prototype.isCurrentItemEnabled = function() {
  return this.currentData() ? this.currentData().enabled : false;
};

Window_EnemyBook_Category.prototype.itemTextAlign = function() {
  return "left";
};

//Window_EnemyBook_Index
function Window_EnemyBook_Index() {
  this.initialize(...arguments);
}

Window_EnemyBook_Index.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Index.prototype.constructor = Window_EnemyBook_Index;

Window_EnemyBook_Index._lastTopRow = 0;
Window_EnemyBook_Index._lastIndex = 0;

Window_EnemyBook_Index.prototype.initialize = function(rect) {
  this._userWindowSkin = param.IndexWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._enemyList = [];
  this._category = null;
  this.refresh();
};

Window_EnemyBook_Index.prototype.setSelect = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    Window_EnemyBook_Index._lastIndex = this.maxItems() > 0 ? Math.min(Window_EnemyBook_Index._lastIndex, this.maxItems() - 1) : 0;
  }
  if (Window_EnemyBook_Index._lastTopRow + this.maxPageRows() - 1 < Window_EnemyBook_Index._lastIndex) {
    Window_EnemyBook_Index._lastTopRow += 1;
  }
  this.setTopRow(Window_EnemyBook_Index._lastTopRow);
  this.select(Window_EnemyBook_Index._lastIndex);
};

Window_EnemyBook_Index.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Index.prototype.maxItems = function() {
  return this._enemyList ? this._enemyList.length : 0;
};

Window_EnemyBook_Index.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
  //this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.updatePercent = function() {
  if (this._percentWindow) {
    const enemy = this._enemyPercentList;
    this._percentWindow.percentRefresh(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateIndex = function() {
  Window_EnemyBook_Index._lastTopRow = this.topRow();
  Window_EnemyBook_Index._lastIndex = this.index();
};

Window_EnemyBook_Index.prototype.getEnemy = function() {
  return this._enemyList[this.index()];
};

Window_EnemyBook_Index.prototype.setPercentWindow = function(percentWindow) {
  this._percentWindow = percentWindow;
  this.updatePercent();
};

Window_EnemyBook_Index.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBook_Index.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};

Window_EnemyBook_Index.prototype.setCategory = function() {
  const index = this._categoryWindow._categorySelect;
  this._category = this._categoryWindow._list[index];
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index] : null;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
  this._enemyPercentList = [];
  this._enemyList = $dataEnemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_Index.prototype.includes = function(enemy) {
  const result = $gameSystem.isEnemyBook(enemy);
  if (result) {
    this._enemyPercentList.push(enemy);
  }
  if (result && this.categoryIncludes(enemy) && this.unknownEnemyVisible(enemy)) {
    return true;
  }
  return false;
};

Window_EnemyBook_Index.prototype.unknownEnemyVisible = function(enemy) {
  return !param.UnknownVisible || (param.UnknownVisible && $gameSystem.isInEnemyBook(enemy));
};

Window_EnemyBook_Index.prototype.categoryIncludes = function(enemy) { 
  if (!this._category || this._category.symbol === "all") {
    return true;
  }
  const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : ["all"];
  return enemyCategory.find(category => category === this._category.symbol);
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    let name = '';
    let iconId = 0;
    if ($gameSystem.isInEnemyBook(enemy)) {
      name = enemy.name;
      iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
    } else {
      name = this.unknownDataLength(enemy);
      iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? param.UnknownEnemyIcons : 0;
    }
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, rect.width - textMargin);
    if(param.NumberType > 0) {
      let numberText = param.NumberMode ? index + 1 : $gameSystem.getEnemyBookNumber(enemy.id);
      //let numberText = $gameSystem.getEnemyBookNumber(enemy.id);
      const textWidth = this.numberWidth(numberText);
      if (param.NumberType === 2) {
        numberText = this.numberWidthSlice(numberText);
      }
      this.drawText(numberText, rect.x, rect.y, textWidth);
      this.drawText(":", rect.x + textWidth + 6, rect.y);
      if (iconId > 0) {
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(iconId, rect.x + textWidth + 24, iconY);
      }
      this.drawText(name, rect.x + textWidth + 24 + textMargin, rect.y, itemWidth - textWidth - 24);
    } else {
      if (iconId > 0) {
        const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(iconId, rect.x, iconY);
      }
      this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
    }
  }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText) {
  return this.textWidth($gameSystem._enemyBookLength >= 1000 || param.NumberType === 2 ? '000' : '00');
};

Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText) {
  return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = this.EnemyNameLength(enemy);
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
};

Window_EnemyBook_Index.prototype.EnemyNameLength = function(enemy) {
	return enemy.name.length;
};

Window_EnemyBook_Index.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBook_Index.prototype.refresh = function() {
  this.makeEnemyList();
  this.updatePercent();
  this.setSelect();
  Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_Index.prototype.processCancel = function() {
  this.updateIndex();
  Window_Selectable.prototype.processCancel.call(this);
};

//Window_EnemyBook_InfoIndex
function Window_EnemyBook_InfoIndex() {
  this.initialize(...arguments);
}

Window_EnemyBook_InfoIndex.prototype = Object.create(Window_EnemyBook_Index.prototype);
Window_EnemyBook_InfoIndex.prototype.constructor = Window_EnemyBook_InfoIndex;

Window_EnemyBook_InfoIndex._lastTopRow = 0;
Window_EnemyBook_InfoIndex._lastIndex = 0;

Window_EnemyBook_InfoIndex.prototype.initialize = function(rect) {
  this._userWindowSkin = param.InfoIndexWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this.refresh();
};

Window_EnemyBook_InfoIndex.prototype.setSelect = function() {
  if (Window_EnemyBook_InfoIndex._lastTopRow + this.maxPageRows() - 1 < Window_EnemyBook_InfoIndex._lastIndex) {
    Window_EnemyBook_InfoIndex._lastTopRow += 1;
  }
  this.setTopRow(Window_EnemyBook_InfoIndex._lastTopRow);
  this.select(Window_EnemyBook_InfoIndex._lastIndex);
};

Window_EnemyBook_InfoIndex.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.selectEnemy = this._enemyList[this.index()];
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_InfoIndex.prototype.refresh = function() {
  this.makeEnemyList();
  this.setSelect();
  Window_Selectable.prototype.refresh.call(this);
};

Window_EnemyBook_InfoIndex.prototype.makeEnemyList = function() {
  this._enemyList = [];
  this._enemyList = $gameTroop._enemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_InfoIndex.prototype.includes = function(enemy) {
  if (!enemy.enemy().meta.NoBookData && enemy.isAlive()) {
    return true;
  }
  return false;
};

Window_EnemyBook_InfoIndex.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.getEnemy = function() {
  return this._enemyList[this.index()] ? this._enemyList[this.index()].enemy() : null;
};

Window_EnemyBook_InfoIndex.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    let name = null;
    if (param.RegistrationEnemyInfo) {
      if ($gameSystem.isInEnemyBook(enemy)) {
        name = this._enemyList[index].name();
        this.changeTextColor(ColorManager.textColor(param.RegistrationEnemyInfoColor));
        iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
      } else {
        name = this.unknownDataLength(enemy);
        iconId = enemy.meta.EnemyIcon && enemy.meta.EnemyIcon > 0 ? param.UnknownEnemyIcons : 0;
      }
    } else {
      name = this._enemyList[index].name();
      if ($gameSystem.isInEnemyBook(enemy)) {
        this.changeTextColor(ColorManager.textColor(param.RegistrationEnemyInfoColor));
      }
      iconId = enemy.meta.EnemyIcon ? Number(enemy.meta.EnemyIcon) : 0;
    }
    if ($gameSystem.isInEnemyBookStatus(enemy)) {
      this.changeTextColor(ColorManager.textColor(param.RegistrationStatusEnemyInfoColor));
    }
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, rect.width - textMargin);
    if (iconId > 0) {
      const iconY = rect.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
      this.drawIcon(iconId, rect.x, iconY);
    }
    this.drawText(name, rect.x + textMargin, rect.y, itemWidth);
    this.resetTextColor();
  }
};

//Window_EnemyBook
function Window_EnemyBook() {
  this.initialize(...arguments);
}

Window_EnemyBook.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;

Window_EnemyBook.prototype.initialize = function(rect) {
  this._userWindowSkin = param.ContentWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._additionalSprites = {};
  this._enemy = null;
  this._bookMode = 0;
  this._enemy = null;
  this._enemyData = [];
  this._pageMode = 0;
  this._enemySprite = new Sprite_BookEnemy();
  this.selectEnemy = null;
  this._AnalyzeStatus = null;
  this.displayList = null;
  this.addChildToBack(this._enemySprite);
  this.refresh();
};

Window_EnemyBook.prototype.setAnalyzeStatus = function(args) {
  this._AnalyzeStatus = args;
  if (this._AnalyzeStatus) {
    this._AnalyzeStatus.ContentCols = !this._AnalyzeStatus.ContentCols ? param.ContentCols : this._AnalyzeStatus.ContentCols;
  }
};

Window_EnemyBook.prototype.setEnemy = function(enemy) {
  if(this._enemy !== enemy) {
    this._enemy = enemy;
    this.refresh();
  } else if (this._bookMode === 2) {
    this._enemy = enemy;
    this.refresh();
  }
};

Window_EnemyBook.prototype.maxCols = function() {
  if (this._bookMode === 1) {
    return this._AnalyzeStatus.ContentCols;
  } else if (this._bookMode === 2) {
    return param.InfoContentCols;
  }
  return param.ContentCols;
};

Window_EnemyBook.prototype.getBackgroundId = function() {
  return Math.max(this.displayList[this._pageMode].PageBackGroundId, 1) - 1 || 0;
};

Window_EnemyBook.prototype.defeatFlag = function() {
  return $gameSystem.defeatNumber(this._enemy.id) > 0;
};

Window_EnemyBook.prototype.paramMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.paramEXMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.showDropItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.dropItemFlag = function(index) {
  return param.ShowDropItemName ? $gameSystem.getDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showStealItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.stealItemFlag = function(index) {
  return param.ShowStealItemName ? $gameSystem.getStealItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.condDropItemFlag = function(index) {
  return Imported.NUUN_EnemyBookEX_2 && this.getShowCondDropItemName() ? $gameSystem.getCondDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showActionMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.actionFlag = function(index) {
  return param.ShowActionName ? $gameSystem.getEnemyBookActionFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onElementsFlag = function(index) {
  return Imported.NUUN_EnemyBookEX_1 && param.ShowElementsIcon ? $gameSystem.getEnemyBookElementFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onStateFlag = function(index) {
  return Imported.NUUN_EnemyBookEX_1 && param.ShowStateIcon ? $gameSystem.getEnemyBookStateFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.onDebuffFlag = function(index) {
  return Imported.NUUN_EnemyBookEX_1 && param.ShowDebuffIcon ? $gameSystem.getEnemyBookDebuffFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
  return this._enemy.meta.ShowDataBook || this._bookMode === 1 || (this._bookMode === 2 && !param.InfoMaskMode);
};

Window_EnemyBook.prototype.analyzeGaugeVisible = function() {
  return this._AnalyzeStatus && this.scanMode() && eval(this._AnalyzeStatus.StatusGaugeVisible);
};

Window_EnemyBook.prototype.infoGaugeVisible = function() {
  return this.scanMode() && param.InfoStatusGaugeVisible;
};

Window_EnemyBook.prototype.gaugeVisibleMode = function(maskMode) {
  return (this._bookMode === 1 && this.analyzeGaugeVisible()) || (this._bookMode === 2 && this.infoGaugeVisible() && this.paramMask(maskMode));
};

Window_EnemyBook.prototype.analyzeCurrentStatus = function() {
  return this._AnalyzeStatus && eval(this._AnalyzeStatus.EnemyCurrentStatus);
};

Window_EnemyBook.prototype.infoCurrentStatus = function() {
  return param.InfoEnemyCurrentStatus;
};

Window_EnemyBook.prototype.maxWidth = function() {
  return this.itemWidth() / 2 - this.itemPadding() * 2;
};

Window_EnemyBook.prototype.crisisColor = function(enemy) {
  return enemy.isDying() ? ColorManager.crisisColor() : ColorManager.normalColor();
};

Window_EnemyBook.prototype.systemWidth = function(swidth, width) {
  return swidth > 0 ? swidth : Math.floor(width / 3);
};

Window_EnemyBook.prototype.scanMode = function() {
  return (this._bookMode === 1 && this.analyzeCurrentStatus()) || (this._bookMode === 2 && this.infoCurrentStatus());
};

Window_EnemyBook.prototype.getColorCode = function(color) {
  if (typeof(color) === "string") {
    return color;
  }
  return ColorManager.textColor(color);
};

Window_EnemyBook.prototype.buffColor = function(params, nparams) {
  const buffColor = this._bookMode === 1 ? this._AnalyzeStatus.BuffColor : param.InfoBuffColor;
  const debuffColor = this._bookMode === 1 ? this._AnalyzeStatus.DebuffColor : param.InfoDebuffColor;
  if (this._bookMode === 0) {
    return ColorManager.normalColor();
  } else if (params > nparams) {
    return buffColor !== undefined ? ColorManager.textColor(buffColor) : ColorManager.normalColor();
  } else if (params < nparams) {
    return debuffColor !== undefined ? ColorManager.textColor(debuffColor) : ColorManager.normalColor();
  } else {
    return ColorManager.normalColor();
  }
};

Window_EnemyBook.prototype.refresh = function() {
  if(!this._enemy || this._pageMode < 0) {
    this.contents.clear();
    this.removeSprite();
    this._enemySprite.bitmap = null;
    return;
  }
  let enemy = null;
  if (this._bookMode >= 1) {
    enemy = this.scanMode() ? this.selectEnemy : new Game_Enemy(this._enemy.id, 0, 0);
  } else {
    if(!this._enemyData[this._enemy.id]) {
      enemy = new Game_Enemy(this._enemy.id, 0, 0);
      this._enemyData[this._enemy.id] = enemy;
    } else {
      enemy = this._enemyData[this._enemy.id];
    }
  }
  this.contents.clear();
  this._enemySprite.bitmap = null;
  this._enemySprite._svEnemy = false;
  this.removeSprite();
  if (this._bookMode === 0 || (param.RegistrationEnemyInfo && this._bookMode === 2)) {//通常モード
    if (!enemy || !$gameSystem.isInEnemyBook(this._enemy)) {
      return;
    }
  } else if (this._bookMode >= 1){//アナライズモード、敵の情報
    if (!enemy) {
      return;
    }
  }
  this.page(enemy);
};

Window_EnemyBook.prototype.page = function(enemy) {
  if (!this.displayList || this.displayList.length <= 0) {
    return;
  }
  ge = enemy;
  de = this._enemy;
  const list = this.displayList[this._pageMode];
  const listContent = this.listDate(list) || [];
  const bitmap = this.getEnemyBitmap(listContent, enemy);
  if (bitmap) {
    bitmap.addLoadListener(this.drawPage.bind(this, listContent, enemy));
  } else {
    this.drawPage(listContent, enemy);
  }
};

Window_EnemyBook.prototype.drawPage = function(listContent, enemy) {
  const lineHeight = this.contentsLineHeight();
  for (const date of listContent) {
    const x_Position = date.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (date.X_Coordinate || 0);
    const y = (date.Y_Position - 1) * lineHeight + rect.y + (date.Y_Coordinate || 0);
    const width = date.ItemWidth && date.ItemWidth > 0 ? date.ItemWidth : this.widthMode(date, rect);
    this.dateDisplay(date, enemy, x, y, width);
  }
};

Window_EnemyBook.prototype.widthMode = function(list, rect) {
  if (list.WideMode === 2) {
    rect.width = rect.width * 2 + this.colSpacing();
  } else if (list.WideMode === 3 && param.ContentCols === 3) {
    rect.width = rect.width * 3 + (this.colSpacing() * 2);
  }
  return rect.width;
};

Window_EnemyBook.prototype.listDate = function(list) {
  switch (list.ListDateSetting) {
    case 1:
      return param.PageList1;
    case 2:
      return param.PageList2;
    case 3:
      return param.PageList3;
    case 4:
      return param.PageList4;
    case 5:
      return param.PageList5;
    case 6:
      return param.PageList6;
    case 7:
      return param.PageList7;
    case 8:
      return param.PageList8;
    case 9:
      return param.PageList9;
    case 10:
      return param.PageList10;
    case 11:
      return param.PageList11;
    case 12:
      return param.PageList12;
    case 13:
      return param.PageList13;
    case 14:
      return param.PageList14;
    case 15:
      return param.PageList15;
    case 16:
      return param.PageList16;
    case 17:
      return param.PageList17;
    case 18:
      return param.PageList18;
    case 19:
      return param.PageList19;
    case 20:
      return param.PageList20;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.dateDisplay = function(list, enemy, x, y, width) {
  switch (list.DateSelect) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      this.enemyParams(list, enemy, x, y, width);
      break;
    case 30:
      this.enemyExp(list, enemy, x, y, width);
      break;
    case 31:
      this.enemyGold(list, enemy, x, y, width);
      break;
    case 32:
      this.defeat(list, enemy, x, y, width);
      break;
    case 33:
      this.enemyName(list, enemy, x, y, width);
      break;
    case 35:
      this.name(list, enemy, x, y, width);
      break;
    case 36:
      this.turn(list, enemy, x, y, width);
      break;
    case 37:
      this.bookEnemyNo(list, enemy, x, y, width);
      break;
    case 40:
      this.drawResistElement(list, enemy, x, y, width);
      break;
    case 41:
      this.drawWeakElement(list, enemy, x, y, width);
      break;
    case 42:
      this.drawNoEffectElement(list, enemy, x, y, width);
      break;
    case 45:
      this.drawResistStates(list, enemy, x, y, width);
      break;
    case 46:
      this.drawWeakStates(list, enemy, x, y, width);
      break;
    case 47:
      this.drawNoEffectStates(list, enemy, x, y, width);
      break;
    case 50:
      this.drawWeakDebuff(list, enemy, x, y, width);
      break;
    case 51:
      this.drawResistDebuff(list, enemy, x, y, width);
      break;
    case 60:
      this.dropItems(list, enemy, x, y, width);
      break;
    case 61:
      this.stealItems(list, enemy, x, y, width);
      break;
    case 62:
      this.condDropItems(list, enemy, x, y, width);
      break;
    case 70:
      this.drawDesc(list, enemy, x, y, width);
      break;
    case 80:
      this.originalParams(list, enemy, x, y, width);
      break;
    case 100:
      this.enemyAction(list, enemy, x, y, width);
      break;
    case 121:
      this.enemyElementChart(list, enemy, x, y, width);
      break;
    case 122:
      this.enemyStateChart(list, enemy, x, y, width);
      break;
    case 200:
      this.enemyImg(list, enemy, x - 4, y - 4, width);
      break;
    case 201:
      this.enemyCharacter(list, enemy, x, y, width);
      break;
    case 250:
      this.commonEnemyBitmap(list, enemy, x, y, width);
      break;
    case 251:
      this.enemyBitmap(list, enemy, x, y, width);
      break;
    case 500:
    this.enemyPageSwitching(list, enemy, x, y, width);
    break;
    case 1000:
      this.horzLine(list, enemy, x, y, width);
      break;
    default:
      break;
  }
};

Window_EnemyBook.prototype.paramNameShow = function(list, enemy) {
  if (list.paramName) {
    return list.paramName
  }
  const params = list.DateSelect;
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return TextManager.param(params - 1);
    case 9:
      return TextManager.basic(6);
    case 10:
    case 11:
      return TextManager.param(params - 2);
    case 12:
      return "会心率";
    case 13:
      return "会心回避率";
    case 14:
      return "魔法回避率";
    case 15:
      return "魔法反射率";
    case 16:
      return "反撃率";
    case 17:
      return "HP再生率";
    case 18:
      return "MP再生率";
    case 19:
      return "TP再生率";
    case 20:
      return "狙われ率";
    case 21:
      return "防御効果率";
    case 22:
      return "回復効果率";
    case 23:
      return "薬の知識";
    case 24:
      return "MP消費率";
    case 25:
      return "TPチャージ率";
    case 26:
      return "物理ダメージ率";
    case 27:
      return "魔法ダメージ率";
    case 28:
      return "床ダメージ率";
    case 29:
      return "獲得経験率";
    default:
      return null;
  }
};

Window_EnemyBook.prototype.paramShow = function(list, enemy) {
  if (list.DetaEval && list.DetaEval[0]) {
    return eval(list.DetaEval[0]);
  }
  const params = list.DateSelect;
  switch (params) {
    case 1:
      return this._bookMode >= 1 && this.scanMode() ? enemy._hp : enemy.param(params - 1);
    case 2:
      return this._bookMode >= 1 && this.scanMode() ? enemy._mp : enemy.param(params - 1);
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return enemy.param(params - 1);
    case 9:
      return enemy._tp;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return enemy.xparam(params - 10) * 100;
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      return enemy.sparam(params - 20) * 100;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.normalParam = function(list, enemy) {
  if (list.DetaEval && list.DetaEval[0]) {
    return eval(list.DetaEval[0]);
  }
  const params = list.DateSelect;
  if (params >= 10) {
    return this.paramShow(list, enemy);
  }
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return this._enemy.params[params - 1];
    default:
      return null;
  }
};

Window_EnemyBook.prototype.enemyParams = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  let text = this.paramShow(list, enemy);
  let textWidth = width;
  if (text !== undefined) {
    if ((list.DateSelect === 1 || list.DateSelect === 2 || list.DateSelect === 9) && $gameParty.inBattle() && enemy && this.gaugeVisibleMode(list.MaskMode)) {
    } else {
      if (list.DateSelect === 9 && !this.scanMode()) {
        return;
      }
      this.drawContentsBackground(list.Back, x, y, width);
      x = this.contensX(x);
      width = this.contensWidth(width);
      this.changeTextColor(this.getColorCode(list.NameColor));
      nameText = this.paramNameShow(list, enemy);
      textWidth = this.systemWidth(list.SystemItemWidth, width);
      this.drawText(nameText, x, y, textWidth);
    }
    this.resetTextColor();
    if(!this.paramMask(list.MaskMode)){
      text = param.UnknownStatus;
    } else {
      text = this.statusParamDecimal(text, list.Decimal);
    }
    if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 1) {
      this.placeGauge(enemy, "hp", x, y);
    } else if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 2) {
      this.placeGauge(enemy, "mp", x, y);
    } else if ($gameParty.inBattle() && this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 9) {
      this.placeGauge(enemy, "tp", x, y);
    } else {
      if (this.scanMode()) {
        if (!this.gaugeVisibleMode(list.MaskMode) && list.DateSelect === 1) {
          this.changeTextColor(this.crisisColor(enemy));
        } else {
          this.changeTextColor(this.buffColor(text, this.normalParam(list, enemy)));
        }
      }
      if (list.DateSelect >= 10) {
        text += list.paramUnit ? String(list.paramUnit) : " %";
      }
      this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
      this.resetTextColor();
    }
  }
};

Window_EnemyBook.prototype.enemyImg = function(list, enemy, x, y, width) {
  const height = list.ImgMaxHeight * this.lineHeight();
  const itemPadding = this.itemPadding();
  this._enemySprite.setMaxWidth(width);
  this._enemySprite.setMaxHeight(height - itemPadding);
  this._enemySprite.setup(enemy, width / 2 + x + (itemPadding * 2), (y + height / 2) + (itemPadding * 2));
};

Window_EnemyBook.prototype.enemyName = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const text = enemy.name();
  const iconId = this._enemy.meta.EnemyIcon ? Number(this._enemy.meta.EnemyIcon) : 0;
  if (iconId > 0) {
    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = iconId > 0 ? ImageManager.iconWidth + 4 : 0;
    const itemWidth = Math.max(0, width - textMargin);
    const textWidth = this.textWidth(text);
    const width2 = Math.min(itemWidth, textWidth);
    if(list.namePosition === 'center') {
      this.drawIcon(iconId, x + (width / 2 - width2 / 2) - textMargin / 2, iconY);
    } else if (list.namePosition === 'left') {
      this.drawIcon(iconId, x, iconY);
    } else {
      this.drawIcon(iconId, x + itemWidth - width2, iconY);
    }
    this.drawText(text, x + textMargin, y, itemWidth, list.namePosition);
  } else {
    this.drawText(text, x, y, width, list.namePosition);
  }
};

Window_EnemyBook.prototype.enemyExp = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : TextManager.exp;
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)) {
    text = list.DetaEval && list.DetaEval[0] ? eval(list.DetaEval[0]) : enemy.exp();
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.enemyGold = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "获得金钱";
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval && list.DetaEval[0] ? eval(list.DetaEval[0]) : enemy.gold();
    this.drawCurrencyValue(text, this.currencyUnit(), x + textWidth + 8, y, width - (textWidth + 8));
  } else {
    text = param.UnknownStatus;
    this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
};

Window_EnemyBook.prototype.defeat = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "击败次数";
  const textWidth = this.systemWidth(list.SystemItemWidth, width);
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval && list.DetaEval[0] ? eval(list.DetaEval[0]) : $gameSystem.defeatNumber(enemy.enemyId());
    if (list.paramUnit) {
      text += String(list.paramUnit);
    }
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.turn = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  if (BattleManager.isTpb() && this.scanMode()) {
    this.drawContentsBackground(list.Back, x, y, width);
    x = this.contensX(x);
    width = this.contensWidth(width);
    this.changeTextColor(this.getColorCode(list.NameColor));
    const nameText = list.paramName ? list.paramName : "ターン";
    const textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
    this.resetTextColor();
    let text;
    if(this.paramEXMask(list.MaskMode)){
      text = list.DetaEval && list.DetaEval[0] ? eval(list.DetaEval[0]) : Math.max(enemy.turnCount(), 1);
    } else {
      text = param.UnknownStatus;
    }
    this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
};

Window_EnemyBook.prototype.name = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  const nameText = list.paramName;
  if (nameText) {
    this.changeTextColor(this.getColorCode(list.NameColor));
    this.drawText(nameText, x, y, width, list.namePosition);
  }
};

Window_EnemyBook.prototype.bookEnemyNo = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  const nameText = list.paramName;
  let textWidth  = 0;
  if (nameText) {
    this.changeTextColor(this.getColorCode(list.NameColor));
    this.drawText(nameText, x, y, width, list.namePosition);
    textWidth = this.textWidth(nameText) + this.itemPadding();
    this.resetTextColor();
  }
  let text = $gameSystem.getEnemyBookNumber(this._enemy.id);
  if (param.NumberType === 2) {
    text = this.numberWidthSlice(text);
  }
  this.drawText(text, x + textWidth, y, width - textWidth, "left");
};

Window_EnemyBook.prototype.enemyPageSwitching = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  const nameText = list.paramName ? list.paramName : '←→キー：ページ切り替え';
  this.changeTextColor(this.getColorCode(list.NameColor));
  this.drawText(nameText, x, y, width, list.namePosition);
};

Window_EnemyBook.prototype.horzLine = function(list, enemy, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, this.getColorCode(list.NameColor));
  this.contents.paintOpacity = 255;
};

Window_EnemyBook.prototype.drawResistElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if(Element.ElementNo){
      let rate = enemy.elementRate(Element.ElementNo);
      if(rate < 1 && param.ResistNoEffectElement || (rate < 1 && rate > 0 && !param.ResistNoEffectElement)){
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawWeakElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate > 1) {
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawNoEffectElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate <= 0) {
        if (Unknown || (param.ElementUnknownIconId > 0 && !this.onElementsFlag(Element.ElementNo))) {
          icon = param.ElementUnknownIconId;
        } else {
          icon = this.onElementsFlag(Element.ElementNo) ? Element.ElementIconId : 0;
        }
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawResistStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "抵抗状态";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let rate = enemy.stateRate(stateId);
      if (param.ResistNoEffectState) {
        rate *= enemy.isStateResist(stateId) ? 0 : 1;
      }
      if (rate < 1 && (param.ResistNoEffectState || (!param.ResistNoEffectState && rate > 0))) {
        if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
          icon = param.StateUnknownIconId;
        } else {
          icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
        }
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawWeakStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "虚弱状态";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
  if(State.StateId){
    let stateId = State.StateId;
    let rate = enemy.stateRate(stateId);
    if (((!param.NormalWeakState && rate > 1) || (param.NormalWeakState && rate >= 1)) && !enemy.isStateResist(stateId)) {
      if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
        icon = param.StateUnknownIconId;
      } else {
        icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
      }
      if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawNoEffectStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let icon = null;
      let rate = enemy.stateRate(stateId);
      if (rate <= 0 || enemy.isStateResist(stateId)) {
        if (Unknown || (param.StateUnknownIconId > 0 && !this.onStateFlag(stateId))) {
          icon = param.StateUnknownIconId;
        } else {
          icon = this.onStateFlag(stateId) ? $dataStates[stateId].iconIndex : 0;
        }
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
	});
};

Window_EnemyBook.prototype.buffIconIndex = function(rate, paramId) {
	if (rate > 1) {
    return Game_BattlerBase.ICON_BUFF_START + (buffLevel - 1) * 8 + paramId;
  }
};

Window_EnemyBook.prototype.drawWeakDebuff = function(list, enemy, x, y, width) {
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点debuff";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.DeBuffUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.DeBuffList.forEach(deBuff => {
    let rate = enemy.debuffRate(deBuff.ParamId);
    if (rate > 1) {
      if (Unknown || (param.DeBuffUnknownIconId > 0 && !this.onDebuffFlag(deBuff.ParamId))) {
        icon = param.DeBuffUnknownIconId;
      } else {
        icon = this.onDebuffFlag(deBuff.ParamId) ? deBuff.DebuffIconId : 0;
      }
      if (icon && icon > 0) icons.push(icon);
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawResistDebuff = function(list, enemy, x, y, width) {
  let Unknown = false;
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "抗性减益";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.DeBuffUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  let icon = 0;
  param.DeBuffList.forEach(deBuff => {
    let rate = enemy.debuffRate(deBuff.ParamId);
    if (rate < 1) {
      if (Unknown || (param.DeBuffUnknownIconId > 0 && !this.onDebuffFlag(deBuff.ParamId))) {
        icon = param.DeBuffUnknownIconId;
      } else {
        icon = this.onDebuffFlag(deBuff.ParamId) ? deBuff.DebuffIconId : 0;
      }
      if (icon && icon > 0) icons.push(icon);
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.dropItems = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "掉落物品";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const dropList = this._enemy.dropItems;
  let x2 = x;
  let y2 = y;
  let dropIndex = 0;
  const listLength = dropList.length;
  for(i = 0; i < listLength; i++){
    if(dropList[i].kind > 0){
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      this.drawContentsBackground(list.Back, x2, y2, width);
      x3 = this.contensX(x2);
      width2 = this.contensWidth(width);
      let item = enemy.itemObject(dropList[i].kind, dropList[i].dataId);
      if((this.showDropItemMask(list.MaskMode, enemy) && this.dropItemFlag(i))) {
        let rate = dropList[i].denominator;
        const text = Imported.NUUN_DropRatePercentage ? rate / 10 +" %": "1/" + rate;
        let textWidth = this.textWidth(text);
        this.drawItemName(item, x3, y2, width2 - textWidth - this.itemPadding());
        if (param.DropItemProbabilityShow && !item.meta.NoDropProbability) {
          this.drawEnemyBookNumber(text, x3, y2, width2);
        }
        dropIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x3, y2, width2,'left');
        dropIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.stealItems = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_StealableItems) {
    return;
  }
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "盗めるアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 1;
    } else if (list.WideMode === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 2;
    }
  }
  const stealList = enemy._stealItems;
  let x2 = x;
  let y2 = y;
  let stealIndex = 0;
  const listLength = stealList.length;
  for(let i = 0; listLength > i; i++){
    if (stealList[i].kind > 0 && stealList[i].kind < 4) {
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      this.drawContentsBackground(list.Back, x2, y2, width);
      x3 = this.contensX(x2);
      width2 = this.contensWidth(width);
      let item = enemy.stealObject(stealList[i].kind, stealList[i].dataId);
      if((this.showStealItemMask(list.MaskMode, enemy) && this.stealItemFlag(i))) {
        let rate = stealList[i].denominator;
        const unit = list.paramUnit ? String(list.paramUnit) : " %";
        let textWidth = this.textWidth(rate + unit);
        this.drawItemName(item, x3, y2, width2 - textWidth - this.itemPadding());
        if (param.StealItemProbabilityShow) {
          this.drawEnemyBookNumber(rate + unit, x3, y2, width2);
        }
        stealIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x3, y2, width2,'left');
        stealIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.condDropItems = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_ConditionalDrops && !Imported.NUUN_EnemyBookEX_2) {
    return;
  }
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "条件ドロップアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (this.getCondDropItemMultiCol()) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const dropList = enemy._conditionalDropItems;
  let x2 = x;
  let y2 = y;
  let dropIndex = 0;
  const listLength = dropList.length;
  for(i = 0; i < listLength; i++){
    if(dropList[i][1] > 0){
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      this.drawContentsBackground(list.Back, x2, y2, width);
      x3 = this.contensX(x2);
      width2 = this.contensWidth(width);
      const item = enemy.getCondDropItem(dropList[i]);
      if((this.showDropItemMask(list.MaskMode, enemy) && this.condDropItemFlag(i))) {
        this.drawItemName(item, x3, y2, width2 - this.itemPadding());
        dropIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x3, y2, width2,'left');
        dropIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.drawDesc = function(list, enemy, x, y, width) {
  const nameText = list.paramName;
  this.contentsFontSize(list);
  if (nameText) {
    this.changeTextColor(this.getColorCode(list.NameColor));
    this.drawText(nameText, x, y);
    y += this.lineHeight();
  }
  this.resetTextColor();
  if(this.paramEXMask(list.MaskMode)){
    let text = list.DetaEval && list.DetaEval[0] ? list.DetaEval[0] : undefined;
    if (!text) {
      const method = list.textMethod;
      if (method) {
        text = enemy.enemy().meta[method];
      }
    } else {
      text = eval(text);
    }
    if(text){
      this.drawTextEx(text, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.originalParams = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.drawContentsBackground(list.Back, x, y, width);
  x = this.contensX(x);
  width = this.contensWidth(width);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName;
  let textWidth = width;
  if (nameText) {
    textWidth = this.systemWidth(list.SystemItemWidth, width);
    this.drawText(nameText, x, y, textWidth);
  }
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = eval(list.DetaEval[0]);
    if (list.paramUnit) {
      text += String(list.paramUnit);
    }
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.enemyAction = function(list, enemy, x, y, width) {
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "使用スキル";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  let cols = 1;
  let x2 = x;
  let y2 = y;
  if (param.ActionMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const action = this._enemy.actions;
  this.resetTextColor();
  const dateLenght = param.ActionMaxItems === 0 ? action.length : param.ActionMaxItems;
  for (let i = 0; i < dateLenght; i++) {
    if (param.ActionMultiCol) {
      x2 = Math.floor(i % cols) * (width + this.itemPadding()) + x;
      y2 = Math.floor(i / cols) * lineHeight + y + lineHeight;
    } else {
      y2 += lineHeight;
    }
    this.drawContentsBackground(list.Back, x2, y2, width);
    x3 = this.contensX(x2);
    width2 = this.contensWidth(width);
    const skillDate = $dataSkills[action[i].skillId];
    if(this.showActionMask(list.MaskMode, enemy) && this.actionFlag(i)){
      this.drawItemName(skillDate, x3, y2, width2);
    } else {
      this.drawText(this.unknownDataLength(skillDate.name), x3, y2, width2);
    }
  }
};

Window_EnemyBook.prototype.commonEnemyBitmap = function(list, enemy, x, y, width) {
  const bitmap = ImageManager.nuun_LoadPictures(list.ImgData[0]);
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.drawImg.bind(this, bitmap, list, x, y, width));
  } else if (bitmap) {
    this.drawImg(bitmap, list, x, y, width);
  }
};

Window_EnemyBook.prototype.enemyBitmap = function(list, enemy, x, y, width) {
  const dataImg = this._enemy.meta[list.textMethod] ? this._enemy.meta[list.textMethod].split(',') : null;
  if (dataImg) {
    const bitmap = ImageManager.loadBitmap("img/"+ param.ImgFolder +"/", dataImg[0]);
    x += Number(dataImg[1]) || 0;
    y += Number(dataImg[2]) || 0;
    if (!bitmap.isReady()) {
      bitmap.addLoadListener(this.drawImg.bind(this, bitmap, list, x, y, width));
    } else if (bitmap) {
      this.drawImg(bitmap, list, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.drawImg = function(bitmap, list, x, y, width) {
  const height = list.ImgMaxHeight * this.lineHeight();
  const scalex = Math.min(1.0, width / bitmap.width);
  const scaley = Math.min(1.0, height / bitmap.height);
  const scale = scalex > scaley ? scaley : scalex;
  const dw = Math.floor(bitmap.width * scale);
  const dh = Math.floor(bitmap.height * scale);
  x += Math.floor(width / 2 - dw / 2);
  this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_EnemyBook.prototype.enemyElementChart = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_RadarChartBase) {
    return;
  }
  this.contentsFontSize(list);
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "属性耐性";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  this.enemyElementRadarChart(this.setEnemyElementChart(enemy), enemy, x, y + lineHeight ,'element');
};

Window_EnemyBook.prototype.setEnemyElementChart = function(enemy) {
  const data = [];
  for (const element of param.ElementList) {
    let rate = enemy.elementRate(element.ElementNo);
    const elementName = $dataSystem.elements[element.ElementNo];
    const elementIconId = element.ElementIconId || 0;
    data.push(this.setRadarChart(elementName, rate, elementIconId));
  }
  return data;
};

Window_EnemyBook.prototype.enemyStateChart = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_RadarChartBase) {
    return;
  }
  this.contentsFontSize(list);
  this.changeTextColor(this.getColorCode(list.NameColor));
  const nameText = list.paramName ? list.paramName : "ステート耐性";
  this.drawText(nameText, x, y, width);
  const lineHeight = this.lineHeight();
  this.enemyStateRadarChart(this.setEnemyStateChart(enemy), enemy, x, y + lineHeight ,'state');
};

Window_EnemyBook.prototype.setEnemyStateChart = function(enemy) {
  const data = [];
  for (const state of param.StateList) {
    let stateId = state.StateId;
    let rate = enemy.stateRate(stateId);
    rate *= enemy.isStateResist(stateId) ? 0 : 1;
    const stateName = $dataStates[stateId].name;
    const iconId = param.RadarChartIcon ? $dataStates[stateId].iconIndex : 0;
    data.push(this.setRadarChart(stateName, rate, iconId));
  }
  return data;
};

Window_EnemyBook.prototype.enemyCharacter = function(list, enemy, x, y, width) {
  this.enemyCharacterChip(enemy, x, y);
};

Window_EnemyBook.prototype.contentsFontSize = function(list) {
  this.contents.fontSize = $gameSystem.mainFontSize() + param.EnemyBookDefaultFontSize + (list.FontSize || 0);
};

Window_EnemyBook.prototype.contentsLineHeight = function() {
  return $gameSystem.mainFontSize() + param.EnemyBookDefaultFontSize + param.EnemyBookFontMargin;
};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
  if(param.UnknownItems === '？' || param.UnknownItems === '?') {
    const name_length = this.nameLength(name);
    return param.UnknownItems.repeat(name_length);
  } else {
    return param.UnknownItems;
  }
};

Window_EnemyBook.prototype.iconX = function(icons, width) {
	if (ImageManager.iconWidth * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return ImageManager.iconWidth;
};

Window_EnemyBook.prototype.drawEnemyBookNumber = function(text, x, y, width,) {
  this.resetTextColor();
  this.drawText(text , x, y, width,'right');
};

Window_EnemyBook.prototype.enemyCharacterChip = function(enemy, x, y) { 
  const type = 'character';
  const key = "enemyBook_%1".format(type);
  const sprite = this.createInnerChipSprite(key, enemy.enemyId());
  sprite._character.setPosition(x + 24, y + this.lineHeight());
  sprite.updatePosition();
  sprite.show();
};

Window_EnemyBook.prototype.createInnerChipSprite = function(key, id) {
  const enemyCharacter = new Game_EnemyBookCharacter(id);
  const dict = this._additionalSprites;
  if (dict[key]) {
    dict[key].setCharacter(enemyCharacter);
    return dict[key];
  } else {
    const sprite = new Sprite_EnemyBookCharacter(enemyCharacter);
    dict[key] = sprite;
    this.addInnerChild(sprite);
    return sprite;
  }
};

Window_EnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
  //if (Imported.NUUN_GaugeImage) {
  //  Window_StatusBase.prototype.placeGaugeImg.call(this, enemy, type, x, y)
    //this.placeGaugeImg(enemy, type, x, y);
  //}
  const padding = this.itemPadding();
  const key = "enemyBook-gauge-%2".format(enemy.enemyId(), type);
  const sprite = this.createInnerSprite(key, Sprite_EnemyBookGauge);
  sprite.bitmap.width = width - padding;
  sprite.setup(enemy, type);
  sprite.move(x, y);
  sprite.show();
};

Window_EnemyBook.prototype.createInnerGaugeSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  const sprite = new spriteClass();
  dict[key] = sprite;
  this.addInnerChild(sprite);
  return sprite;
};

Window_EnemyBook.prototype.createInnerSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  if (dict[key]) {
      return dict[key];
  } else {
      const sprite = new spriteClass();
      dict[key] = sprite;
      this.addInnerChild(sprite);
      return sprite;
  }
};

Window_EnemyBook.prototype.removeInnerSprite = function(type) {
  let key = null;
  if (type === 'element' || type === 'state') {
    key = "enemyRadarChart_%1".format(type);
  } else if (type === 'character') {
    key = "enemyBook_%1".format(type);
  } else {
    key = "enemyBook-gauge-%2".format(null, type);
  }
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.removeInnerCharacterSprite = function(type) {
  const key = "enemyBook_%1".format(null, type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.removeSprite = function() {
  if ($gameParty.inBattle()) {
    this.removeInnerSprite('hp');
    this.removeInnerSprite('mp');
    this.removeInnerSprite('tp');
  }
  this.removeInnerSprite('character');
  this.removeInnerSprite('element');
  this.removeInnerSprite('state');
};

Window_EnemyBook.prototype.enemyElementRadarChart = function(list, enemy, x, y, type) { 
  const key = "enemyRadarChart_%1".format(type);
  const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
  sprite.setupColor(param.ElementRadarChartFramecolor,param.ElementRadarChartLineColor, param.ElementRadarChartMainColor1, param.ElementRadarChartMainColor2);
  sprite.setup(enemy, type, list, param.ElementRadarChartRadius, param.ElementRadarChartX, param.ElementRadarChartY, param.ElementRadarChart_FontSize);
  sprite.move(x, y);
};

Window_EnemyBook.prototype.enemyStateRadarChart = function(list, enemy, x, y, type) { 
  const key = "enemyRadarChart_%1".format(type);
  const sprite = this.createInnerSprite(key, Sprite_NUUN_RadarChart);
  sprite.setupColor(param.StateRadarChartFramecolor,param.StateRadarChartLineColor, param.StateRadarChartMainColor1, param.StateRadarChartMainColor2);
  sprite.setup(enemy, type, list, param.StateRadarChartRadius, param.StateRadarChartX, param.StateRadarChartY, param.StateRadarChart_FontSize);
  sprite.move(x, y);
};

Window_EnemyBook.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

Window_EnemyBook.prototype.drawContentsBackground = function(back, x, y, width) {
  if (back) {
    const rect = this.contentsRect(x, y, width);
    this.drawContentsBackgroundRect(rect);
  }
};

Window_EnemyBook.prototype.drawContentsBackgroundRect = function(rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contents.strokeRect(x, y, w, h, c1);
};

Window_EnemyBook.prototype.getEnemyBitmap = function(list, enemy) {
  let bitmap = null;
  for (const data of list) {
    const commonEnemyBitmap = (data.DateSelect === 200 || data.DateSelect === 250) && data.ImgData && data.ImgData[0] ? ImageManager.nuun_LoadPictures(data.ImgData[0]) : null;
    const enemyBitmapData = data.DateSelect === 251 && this._enemy.meta[data.textMethod] ? this._enemy.meta[data.textMethod].split(',') : null;
    const enemyBitmap = enemyBitmapData ? ImageManager.loadBitmap("img/"+ param.ImgFolder +"/", enemyBitmapData[0]) : null;  
    if (commonEnemyBitmap && !commonEnemyBitmap.isReady()) {
      bitmap = commonEnemyBitmap;
    } else if (enemyBitmap && !enemyBitmap.isReady()) {
      bitmap = enemyBitmap;
    }
  }
  return bitmap;
};


Window_EnemyBook.prototype.contentsRect = function(x, y, width) {
  const height = this.lineHeight() - this.rowSpacing();
  return new Rectangle(x, y + 2, width, height);
};

Window_EnemyBook.prototype.contensHeight = function() {
  return this.lineHeight();
};

Window_EnemyBook.prototype.contensX = function(x) {
  return x + (this.itemPadding() / 2);
};

Window_EnemyBook.prototype.contensWidth = function(width) {
  return width - this.itemPadding();
};

Window_EnemyBook.prototype.numberWidthSlice = function(indexText) {
  return ($gameSystem._enemyBookLength >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook.prototype.statusParamDecimal = function(val, decimal) {
  decimal = decimal !== undefined ? Number(decimal) : 0;
  if (param.DecimalMode) {
    return Math.round(val * (decimal > 0 ? Math.pow(10, decimal) : 1)) / (decimal > 0 ? Math.pow(10, decimal) : 1);
  } else {
    return Math.floor(val * (decimal > 0 ? Math.pow(10, decimal) : 1)) / (decimal > 0 ? Math.pow(10, decimal) : 1);
  }
};


//Window_EnemyBookPageCategory
function Window_EnemyBookPageCategory() {
  this.initialize(...arguments);
}

Window_EnemyBookPageCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_EnemyBookPageCategory.prototype.constructor = Window_EnemyBookPageCategory;

Window_EnemyBookPageCategory.prototype.initialize = function(rect) {
  this._userWindowSkin = param.PageWindowsSkin;
  Window_Selectable.prototype.initialize.call(this, rect);
  this._bookList = [];
  this._categorySelect = 0;
  this.maxPageCols = 4;
  this.commandVisible = false;
  this.select(this._categorySelect);
};

Window_EnemyBookPageCategory.prototype.maxCols = function() {
  return this.maxPageCols;
};

Window_EnemyBookPageCategory.prototype.maxItems = function() {
  return this._bookList ? this._bookList.length : 0;
};

Window_EnemyBookPageCategory.prototype.setPageList = function(page, cols) {
  this._bookList = page || [];
  this.maxPageCols = cols;
};

Window_EnemyBookPageCategory.prototype.setPage = function() {
  this._categorySelect = 0;
  this.select(this._categorySelect);
  this.commandVisible = true;
  this.refresh();
};

Window_EnemyBookPageCategory.prototype.itemClear = function() {
  if (this.commandVisible && this.contents) {
    this.scrollBy(0, this._scrollY * -1);
    this.contents.clear();
    this.contentsBack.clear();
    this.commandVisible = false;
  }
};

Window_EnemyBookPageCategory.prototype.updateArrows = function() {
  Window_Scrollable.prototype.updateArrows.call(this);
  this.upArrowVisible = this.commandVisible && this.upArrowVisible;
  this.downArrowVisible = this.commandVisible && this.downArrowVisible;
};

Window_EnemyBookPageCategory.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.updateEnemyStatus();
};

Window_EnemyBookPageCategory.prototype.updateEnemyStatus = function() {
  if (this.index() >= 0) {
    this._categorySelect = this.index();   
  }
  if (this._enemyWindow) {
    this._enemyWindow._pageMode = this._categorySelect;
    if (this.active) {
      $gameTemp.backGroundEbookRefresh = true;
    }
    this._enemyWindow.refresh();
  }
};

Window_EnemyBookPageCategory.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBookPageCategory.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBookPageCategory.prototype.makeCommandList = function() {
  this._bookList.forEach((command, i) => {
    this.addCommand(command.PageCategoryName, "page" + i);
  })
};

Window_EnemyBookPageCategory.prototype.cursorDown = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorUp = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorPagedown = function() {
  
};

Window_EnemyBookPageCategory.prototype.cursorPageup = function() {
  
};

/////////////////////////////////////戦闘/////////////////////////////////////////
const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
  this.createEnemyBookBackGroundSprite();
  this.createEnemyBookPercentWindow();
  this.createEnemyPageWindow();
  this.createEnemyBookIndexWindow();
  this.createEnemyBookInfoIndexWindow();
  this.createEnemyBookEnemyWindow();
  this.createEnemyBookButton();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createEnemyBookCategoryNameWindow();
    this.createEnemyBookCategoryWindow();
  }
};

Scene_Battle.prototype.createEnemyBookBackGroundSprite = function() {
  this._enemyBookBackGround = null;
  if (param.EnemyBookBackGround && !this._enemyBookBackGround) {
    const sprite = new Sprite();
    this._enemyBookBackGround = sprite;
    this.addChild(sprite);
    this._enemyBookBackGround.hide();
  }
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentEnemyBookWindowRect();
    this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
    this.createEnemyBookAddWindow(this._enemyBookPercentWindow, true);
    this._enemyBookPercentWindow.hide();
  }
};

Scene_Battle.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyBookPageWindowRect();
  this._enemyBookPageWindow = new Window_EnemyBookPageCategory(rect);
  this._enemyBookPageWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookPageWindow, true);
  this._enemyBookPageWindow.hide();
  this._enemyBookPageWindow.setPageList(param.PageSetting, param.PageCols);
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
  this._enemyBookIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookIndexWindow, true);
  this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
  this._enemyBookIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyBookInfoIndexWindow = function() {
  const rect = this.enemyBookInfoIndexWindowRect();
  this._enemyBookInfoIndexWindow = new Window_EnemyBook_InfoIndex(rect);
  this._enemyBookInfoIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookInfoIndexWindow, true);
  this._enemyBookInfoIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyBookEnemyWindow = function() {
  const rect = this.enemyBookWindowRect();
  this._enemyBookEnemyWindow = new Window_EnemyBook(rect);
  this.createEnemyBookAddWindow(this._enemyBookEnemyWindow, true);
  this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookInfoIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookPageWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookEnemyWindow.hide();
};

Scene_Battle.prototype.createEnemyBookCategoryNameWindow = function() {
  const rect = this.enemyBookCategoryNameWindowRect();
  this._enemyBookCategoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.createEnemyBookAddWindow(this._enemyBookCategoryNameWindow, false);
  this._enemyBookCategoryNameWindow.hide();
};

Scene_Battle.prototype.createEnemyBookCategoryWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookCategoryWindow = new Window_EnemyBook_Category(rect);
  this._enemyBookCategoryWindow.setHandler("cancel",this.cancelEnemyBook.bind(this));
  this._enemyBookCategoryWindow.setHandler("ok", this.onEnemyBookCategoryOk.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookCategoryWindow, true);
  this._enemyBookCategoryWindow.hide();
  this._enemyBookIndexWindow.setCategoryWindow(this._enemyBookCategoryWindow);
  this._enemyBookCategoryNameWindow.setCategoryWindow(this._enemyBookCategoryWindow);
};

Scene_Battle.prototype.createEnemyBookButton = function() {
  if(ConfigManager.touchUI) {
    this._EnemyBook_cancelButton = new Sprite_Button("cancel");
    this._EnemyBook_cancelButton.x = Graphics.boxWidth - this._EnemyBook_cancelButton.width - 4;
    this._EnemyBook_cancelButton.y = 0;
    if (this._enemyBookBackGround) {
      this.addChild(this._EnemyBook_cancelButton);
      this._EnemyBook_cancelButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    } else {
      this.addWindow(this._EnemyBook_cancelButton);
    }
    this.updatePageupdownButton();
  }
};

Scene_Battle.prototype.createEnemyBookAddWindow = function(windowDate, openness) {
  if (this._enemyBookBackGround) {
    this.addChild(windowDate);
    windowDate.x += (Graphics.width - Graphics.boxWidth) / 2;
    windowDate.y += (Graphics.height - Graphics.boxHeight) / 2;
    windowDate.opacity = 0;
  } else {
    this.addWindow(windowDate);
    if (openness) {
      windowDate.openness = 0;
    }
  }
};

Scene_Battle.prototype.percentEnemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookIndexWidth();
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookPageWindowRect = function() {
  const wx = param.WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
  const height = this.percentEnemyBookWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + height;
  const ww = this.enemyBookIndexWidth();
  const wh = this.enemyBookMainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookInfoIndexWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop();
  const ww = this._enemyBookIndexWindow.width;
  const wh = this.enemyBookMainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? this.enemyBookIndexWidth() : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.enemyBookMainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + this.percentEnemyBookWindowRect().height;
  const ww = this.enemyBookIndexWidth();
  const wh = this.calcWindowHeight(1, true);
  this._enemyBookIndexWindow.y += wh;
  this._enemyBookIndexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
  return Graphics.boxWidth - this.enemyBookIndexWidth();
};

Scene_Battle.prototype.enemyBookIndexWidth = function() {
  return param.BookWidth > 0 ? Graphics.boxWidth - param.BookWidth : Math.floor(Graphics.boxWidth / 3);
};

//コマンド登録
const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
  this._partyCommandWindow.setHandler("enemyBookInfo", this.commandEnemyBookInfo.bind(this));
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
  _Scene_Battle_hideSubInputWindows.call(this);
  if (this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active) {
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  if (BattleManager.isBattleEnd() && (this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active)) {
    this.cancelEnemyBook();
  }
};

Scene_Battle.prototype.setButtonY = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.y = this.buttonY() + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.visible = this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active || this._enemyBookInfoIndexWindow.active || 
    (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) ? true : false;
  }
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  if (this._cancelButton) {
    _Scene_Battle_updateCancelButton.call(this);
    this._cancelButton.visible = this._cancelButton.visible && !this._EnemyBook_cancelButton.visible;
  }
};

Scene_Battle.prototype.setMaxPage = function(page) {
  page = page || [];
  this._enemyBookMaxPage = page.length;
  this._enemyBookEnemyWindow.displayList = page;
};

Scene_Battle.prototype.getMaxPage = function() {
  return this._enemyBookMaxPage;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updatePageupdownButton();
  if ($gameTemp.backGroundEbookRefresh) {
    this.setEnemyBookBackGround();
  }
};

const _Scene_Battle_buttonY = Scene_Battle.prototype.buttonY;
Scene_Battle.prototype.buttonY = function() {
  const y = _Scene_Battle_buttonY.call(this);
  if ((this._enemyBookIndexWindow && this._enemyBookIndexWindow.active) || 
  (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || 
  (this._enemyBookInfoIndexWindow && this._enemyBookInfoIndexWindow.active)) {
    return y - this._helpWindow.height;
  }
  return y;
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  return this._enemyBookIndexWindow.active || this._enemyBookInfoIndexWindow.active || this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isAnyInputWindowActive.call(this);
};

const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
  const result = !this._enemyBookIndexWindow.active && !this._enemyBookInfoIndexWindow.active && !this._enemyBookPageWindow.active &&  _Scene_Battle_isTimeActive.call(this);
  if (param.CategoryOn && param.EnemyBookCategory) {
    return result && (this._enemyBookCategoryWindow && !this._enemyBookCategoryWindow.active);
  }
  return result;
};

Scene_Battle.prototype.enemyBookMainAreaTop = function() {
  const y = 0;
  if (param.NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
};

Scene_Battle.prototype.enemyBookMainAreaHeight = function() {
  return Graphics.boxHeight - this.enemyBookMainAreaTop();
};
//開く処理
Scene_Battle.prototype.openyBookEnemyRefresh = function() {
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.commandEnemyBook = function() {
  $gameTemp.enemyBook_Open = true;
  //let CategoryOn = false;
  this.setEnemyBookPage(param.PageSetting, param.PageCols);
  this.setEenemyBookOnInterruptWindow(this._enemyBookPageWindow);
  this.setEenemyBookOnInterruptWindow(this._enemyBookIndexWindow);
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyBookCategorySelection();
    CategoryOn = true;
    this.setEenemyBookOnInterruptWindow(this._enemyBookCategoryWindow);
  } else {
    this.enemyBookIndexSelection();
  }
  this._enemyBookEnemyWindow._bookMode = 0;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this.setEnemyBook_X();
  const pageLength = this.getEnemuBookPageLength();
  const rect = this.enemyBookWindowRect();
  this.setEnemyBookPage_X();
  this.setEnemyBook_Y(rect, pageLength);
  this.setEnemyBook_Height(rect, pageLength);
  this.openEnemyBookPercentWindow(pageLength);
  this.openyBookEnemyRefresh();
};

Scene_Battle.prototype.commandEnemyBookInfo = function() {
  $gameTemp.enemyBook_Open = true;
  const infoPage = param.InfoMode === 0 ? param.PageSetting : param.InfoPageSetting;
  const cols = param.InfoMode === 0 ? param.PageCols : param.InfoPageCols;
  this.setEnemyBookPage(infoPage, cols);
  this.setEenemyBookOnInterruptWindow(this._enemyBookPageWindow);
  this.setEenemyBookOnInterruptWindow(this._enemyBookInfoIndexWindow);
  this.openEnemyBookInfoIndex();
  this._enemyBookEnemyWindow._bookMode = 2;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this.setEnemyBook_X();
  const pageLength = this.getEnemuBookPageLength();
  const rect = this.enemyBookWindowRect();
  this.setEnemyBookPage_X();
  this.setEnemyBook_Y(rect, pageLength);
  this.setEnemyBook_Height(rect, pageLength);
  if (pageLength > 1) {
    this._enemyBookPageWindow.show();
    this._enemyBookPageWindow.open();
  }
  this.openyBookEnemyRefresh();
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function(args) {
  $gameTemp.enemyBook_Open = true;
  this.setEenemyBookOnInterruptWindow(this._enemyBookPageWindow);
  this._enemyBookEnemyWindow._enemy = null;
  this._enemyBookEnemyWindow.setAnalyzeStatus(args);
  this._enemyBookEnemyWindow._bookMode = 1;
  this.setButtonY();
  this.setAnalyzeDate(args);
  this.setEnemyBookBackGround();
  this.setEnemyBookAnalyze_X();
  const pageLength = this.getEnemuBookPageLength();
  const rect = this.enemyBookWindowRect();
  this.setEnemyBookPage_X();
  this.setEnemyBook_Y(rect, pageLength);
  this.setEnemyBook_Height(rect, pageLength);
  this.openEnemyBookAnalyze();
  this.setAnalyzeTarget();
  const enemy = this.getAnalyzeTarget();
  this.addEnemyDataEnemyBook(enemy);
  this._enemyBookPageWindow.refresh();
  this._enemyBookEnemyWindow.setEnemy(enemy);
};

Scene_Battle.prototype.setEnemyBookPage = function(page, cols) {
  this.setMaxPage(page);
  this._enemyBookPageWindow.setPageList(page, cols);
  this._enemyBookPageWindow.setPage();
};

Scene_Battle.prototype.setEenemyBookOnInterruptWindow = function(ebwindow) {
  ebwindow.interruptWindow = true;
};

Scene_Battle.prototype.setEnemyBook_X = function() {
  this._enemyBookEnemyWindow.x = (param.WindowMode === 0 ? this.enemyBookIndexWidth() : 0) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
};

Scene_Battle.prototype.setEnemyBook_Y = function(rect, pageLength) {
  const ui_y = (Graphics.height - Graphics.boxHeight) / 2;
  let y = rect.y + (this._enemyBookBackGround ? ui_y / 2 : 0);
  if (pageLength > 1 && param.PageWindowsShow) {
    this._enemyBookPageWindow.y = y;
    y += this._enemyBookPageWindow.height;
  } else {
    this._enemyBookPageWindow.y = 0 - (ui_y + this._enemyBookPageWindow.height);
  }
  this._enemyBookEnemyWindow.y = y;
};

Scene_Battle.prototype.setEnemyBookAnalyze_X = function() {
  this._enemyBookEnemyWindow.x = ((Graphics.boxWidth - this._enemyBookEnemyWindow.width) / 2) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
};

Scene_Battle.prototype.getEnemuBookPageLength = function() {
  return this._enemyBookPageWindow._bookList.length;
};

Scene_Battle.prototype.setEnemyBookPage_X = function() {
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
};

Scene_Battle.prototype.setEnemyBook_Height = function(rect, pageLength) {
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 && param.PageWindowsShow ? this._enemyBookPageWindow.height : 0);
};

Scene_Battle.prototype.openEnemyBookPercentWindow = function(pageLength) {
  if (PercentContentLength) {
    this._enemyBookPercentWindow.show();
    this._enemyBookPercentWindow.open();
  }
  if (pageLength > 1) {
    this._enemyBookPageWindow.show();
    this._enemyBookPageWindow.open();
    //if (CategoryOn) {
      //this._enemyBookPageWindow.itemClear();
      //this._enemyBookPageWindow.deselect();
    //}
  }
};

Scene_Battle.prototype.openEnemyBookInfoIndex = function() {
  const infoIndex = this._enemyBookInfoIndexWindow;
  infoIndex.refresh();
  infoIndex.show();
  infoIndex.open();
  infoIndex.activate();
  this._enemyBookPageWindow.activate();
};

Scene_Battle.prototype.openEnemyBookAnalyze = function() {
  this._enemyBookPageWindow.activate();
  this._enemyBookPageWindow.show();
  this._enemyBookPageWindow.open();
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
};

Scene_Battle.prototype.setAnalyzeTarget = function() {
  this._enemyBookEnemyWindow.selectEnemy = BattleManager.analyzeTarget;
};

Scene_Battle.prototype.getAnalyzeTarget = function() {
  return BattleManager.analyzeTarget.enemy();
};

Scene_Battle.prototype.addEnemyDataEnemyBook = function(enemy) {
  if (!$gameSystem.isInEnemyBook(enemy) && ($gameSystem.registrationTiming() === 2 || $gameSystem.registrationTiming() === 3)) {
    $gameSystem.addToEnemyBook(enemy.id);
  }
  if (!$gameSystem.isInEnemyBookStatus(enemy) && ($gameSystem.registrationStatusTiming() === 2 || $gameSystem.registrationStatusTiming() === 3)) {
    $gameSystem.addStatusToEnemyBook(enemy.id);
  }
};

Scene_Battle.prototype.cancelEnemyBook = function() {
  $gameTemp.enemyBook_Open = false;
  this.setEenemyBookOffInterruptWindow(this._enemyBookPageWindow);
  this.setEenemyBookOffInterruptWindow(this._enemyBookIndexWindow);
  this.setEenemyBookOffInterruptWindow(this._enemyBookInfoIndexWindow);
  this.closeEenemyBook();
  this.hideEnemyBookBackground();
  this.deactivateEnemyBook();
};

Scene_Battle.prototype.setEenemyBookOffInterruptWindow = function(ebwindow) {
  ebwindow.interruptWindow = false;
};

Scene_Battle.prototype.closeEenemyBook = function() {
  if (this._enemyBookBackGround) {
    this.hideEenemyBook();
  } else {
    this._enemyBookIndexWindow.close();
    this._enemyBookInfoIndexWindow.close();
    this._enemyBookEnemyWindow.close();
    this._enemyBookPageWindow.close();
    if (PercentContentLength) {
      this._enemyBookPercentWindow.close();
    }
    if (param.CategoryOn && param.EnemyBookCategory) {
      this.setEenemyBookOffInterruptWindow(this._enemyBookCategoryWindow);
      this._enemyBookCategoryWindow.close();
    }
  }
};

Scene_Battle.prototype.hideEenemyBook = function() {
  this._enemyBookIndexWindow.hide();
  this._enemyBookInfoIndexWindow.hide();
  this._enemyBookEnemyWindow.hide();
  this._enemyBookPageWindow.hide();
  if (PercentContentLength) {
    this._enemyBookPercentWindow.hide();
  }
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.setEenemyBookOffInterruptWindow(this._enemyBookCategoryWindow);
    this._enemyBookCategoryWindow.hide();
  }
};

Scene_Battle.prototype.hideEnemyBookBackground = function() {
  if (this._enemyBookBackGround) {
    this._enemyBookBackGround.hide();
  }
};

Scene_Battle.prototype.deactivateEnemyBook = function() {
  const bookMode = this._enemyBookEnemyWindow._bookMode;
  this._enemyBookEnemyWindow._bookMode = 0;
  this._enemyBookEnemyWindow._enemySprite.hide();
  if (bookMode === 0) {
    this._partyCommandWindow.activate();
    this._enemyBookIndexWindow.deactivate();
    this._enemyBookEnemyWindow.selectEnemy = null;
  } else if (bookMode === 2) {
    this._partyCommandWindow.activate();
    this._enemyBookInfoIndexWindow.deactivate();
    this._enemyBookEnemyWindow.selectEnemy = null;
  } else {
    this._enemyBookEnemyWindow.setEnemy(null);
    this._enemyBookPageWindow.deactivate();
    this._enemyBookEnemyWindow.setAnalyzeStatus(null);
  }
};

Scene_Battle.prototype.setAnalyzeDate = function(args) {
  let list = null;
  if (args.Mode === 0) {
    list = param.PageSetting;
  } else if (args.Mode === 1) {
    list = param.AnalyzePageList1;
  } else if (args.Mode === 2) {
    list = param.AnalyzePageList2;
  } else if (args.Mode === 3) {
    list = param.AnalyzePageList3;
  }
  this.setMaxPage(list);
  this._enemyBookPageWindow.setPageList(list, args.PageCols);
  this._enemyBookPageWindow.setPage();
};

Scene_Battle.prototype.onEnemyBookIndexCancel = function() {
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    if (param.CategoryOn && param.EnemyBookCategory) {
      this._enemyBookIndexWindow.updateIndex();
      this.enemyBookCategorySelection();
    } else {
      this.cancelEnemyBook();
    }
  } else {
    this.cancelEnemyBook();
  }
};

Scene_Battle.prototype.onEnemyBookCategoryOk = function() {
  this._enemyBookIndexWindow.setCategory();
  this.enemyBookIndexSelection();
};

Scene_Battle.prototype.enemyBookIndexSelection = function() {
  this._enemyBookIndexWindow.show();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._enemyBookCategoryWindow.hide();
    this._enemyBookCategoryNameWindow.show();
    this._enemyBookCategoryWindow.deselect();
    this._enemyBookCategoryWindow.deactivate();
    this._enemyBookCategoryNameWindow.setName(this._enemyBookCategoryWindow.index());
    this._enemyBookIndexWindow.openness = 255;
  }
  this._enemyBookIndexWindow.refresh();
  this._enemyBookIndexWindow.open();
  this._enemyBookIndexWindow.activate();
  this._enemyBookPageWindow.setPage();
  this._enemyBookPageWindow.activate();
};

Scene_Battle.prototype.enemyBookCategorySelection = function() {
  this._enemyBookCategoryWindow.setSelect();
  this._enemyBookCategoryWindow.show();
  this._enemyBookCategoryWindow.open();
  this._enemyBookCategoryNameWindow.hide();
  this._enemyBookIndexWindow.hide();
  this._enemyBookCategoryWindow.activate();
  this._enemyBookIndexWindow.deselect();
  this._enemyBookIndexWindow.deactivate();
  this._enemyBookPageWindow.deselect();
  this._enemyBookPageWindow.deactivate();
  this._enemyBookPageWindow.itemClear();
};

Scene_Battle.prototype.setEnemyBookBackGround = function() {
  if (this._enemyBookBackGround) {
    let bitmap = null;
    $gameTemp.backGroundEbookRefresh = false;
    const bitmapId = this._enemyBookEnemyWindow.getBackgroundId();
    if (this._enemyBookEnemyWindow._bookMode === 0 && param.BackGroundImg) {
      bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg[bitmapId]);
    } else if (this._enemyBookEnemyWindow._bookMode === 2) {
      if (param.InfoMode === 1 && param.EnemyInfoGroundImg && param.EnemyInfoGroundImg[0]) {
        bitmap = ImageManager.nuun_LoadPictures(param.EnemyInfoGroundImg[bitmapId]);
      } else {
        bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg[0]);
      }
    } else {
      const mode = this._enemyBookEnemyWindow._AnalyzeStatus.Mode;
      if (mode === 1 && param.AnalyzeBackGroundImg && param.AnalyzeBackGroundImg[0]) {
        bitmap = ImageManager.nuun_LoadPictures(param.AnalyzeBackGroundImg[bitmapId]);
      } else {
        bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg[bitmapId]);
      }
    }
    this._enemyBookBackGround.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
    this._enemyBookBackGround.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
    this._enemyBookBackGround.show();
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.setBackGround.bind(this, bitmap));
    } else {
      this.setBackGround(bitmap);
    }
  }
};

Scene_Battle.prototype.setBackGround = function(bitmap) {
  this._enemyBookBackGround.bitmap = bitmap;
  const sprite = this._enemyBookBackGround;
  if (param.BackUiWidth) {
    sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};


const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
  _Window_Selectable_initialize.call(this, rect);
  this.interruptWindow = false;
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
  if ($gameTemp.enemyBook_Open && $gameParty.inBattle()) {
    return this.interruptWindow && this.active ? _Window_Selectable_isOpenAndActive.call(this) : false;
 }
  return _Window_Selectable_isOpenAndActive.call(this);
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (this.isEnemyBook()) {
    this.addCommand(param.CommandName, "enemyBook");
  }
  if (this.isEnemyInfo()) {
    this.addCommand(param.EnemyInfoCommandName, "enemyBookInfo");
  }
};

Window_Command.prototype.isEnemyBook = function() {
  return param.ShowBattleCommand && ($gameSwitches.value(param.enemyBookBattleSwitch) || param.enemyBookBattleSwitch === 0);
};

Window_Command.prototype.isEnemyInfo = function() {
  return param.ShowEnemyInfoCommand && ($gameSwitches.value(param.enemyBookInfoSwitch) || param.enemyBookInfoSwitch === 0);
};

const _Window_BattleLog_displayMiss =Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
  if (target.result().analyzeSkill) {
    const fmt = BattleManager.analyzeMissMessage;
    this.push("pushBaseLine");
		this.push("addText", fmt);
    BattleManager.analyzeMissMessage = null;
  } else {
    _Window_BattleLog_displayMiss.call(this, target);
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.analyzeMissMessage = null;
  this.analyzeTarget = null;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return this.enemyBookIsBusy() || _BattleManager_isBusy.call(this);
};

BattleManager.enemyBookIsBusy = function() {
  return $gameTemp.enemyBook_Open;
};

const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
  _BattleManager_startAction.call(this);
  this.setEnemyBookAction();
};

BattleManager.setEnemyBookAction = function() {
  const subject = this._subject;
  if (subject.isEnemy() && this._action) {
    const actionId = subject.enemy().actions.findIndex(action => action.skillId === this._action.item().id);
    $gameSystem.setEnemyBookActionFlag(subject.enemyId(), actionId, true);
  }
};


function Sprite_EnemyBookHPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookHPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookHPGauge.prototype.constructor = Sprite_EnemyBookHPGauge;

Sprite_EnemyBookHPGauge.prototype.bitmapWidth = function() {
  return param.HPgaugeWidth > 0 ? param.HPgaugeWidth : 128;
};


function Sprite_EnemyBookMPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookMPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookMPGauge.prototype.constructor = Sprite_EnemyBookMPGauge;

Sprite_EnemyBookMPGauge.prototype.bitmapWidth = function() {
  return param.MPgaugeWidth > 0 ? param.MPgaugeWidth : 128;
};


function Sprite_EnemyBookTPGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookTPGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookTPGauge.prototype.constructor = Sprite_EnemyBookTPGauge;

Sprite_EnemyBookTPGauge.prototype.bitmapWidth = function() {
  return param.TPgaugeWidth > 0 ? param.TPgaugeWidth : 128;
};

//とりあえず残しておく
function Sprite_EnemyBookGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookGauge.prototype.constructor = Sprite_EnemyBookGauge;

Sprite_EnemyBookGauge.prototype.bitmapWidth = function() {
  if (this._statusType === 'hp') {
    return param.HPgaugeWidth > 0 ? param.HPgaugeWidth : 128;
  } else if (this._statusType === 'mp') {
    return param.MPgaugeWidth > 0 ? param.MPgaugeWidth : 128;
  }  else if (this._statusType === 'tp') {
    return param.TPgaugeWidth > 0 ? param.TPgaugeWidth : 128;
  }
  return 999;
};


function Sprite_BookEnemy() {
  this.initialize(...arguments);
}

Sprite_BookEnemy.prototype = Object.create(Sprite.prototype);
Sprite_BookEnemy.prototype.constructor = Sprite_BookEnemy;

Sprite_BookEnemy.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_BookEnemy.prototype.initMembers = function() {
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this._battler = null;
  this._svEnemy = false;
  this.maxWidth = 0;
  this.hide();
};

Sprite_BookEnemy.prototype.setup = function(battler,x, y) {
  this._battler = battler;
  this.x = x;
  this.y = y;
  this._svEnemy = battler.enemy().meta.EB_SVBattler ? true : false;
  this.refresh();
};

Sprite_BookEnemy.prototype.refresh = function() {
  let bitmap = null;
  if (this._svEnemy) {
    const sv_name = this.enemySVBattlerName();
    bitmap = ImageManager.loadSvActor(sv_name);
  } else {
    const name = this.enemyBattlerName();
    if ($gameSystem.isSideView()) {
      bitmap = ImageManager.loadSvEnemy(name);
    } else {
      bitmap = ImageManager.loadEnemy(name);
    }
  }
  this.bitmap = bitmap;
  this.show();
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.drawEnemy.bind(this));
  } else {
    this.drawEnemy();
  }
};

Sprite_BookEnemy.prototype.drawEnemy = function() {
  if (!this.bitmap) {
    return;
  }
  if (this._svEnemy) {
    this._pattern = 0;
    this._motionCount = 0;
    this.scale.x = param.SVEnemyMirror ? -1 : 1;
    this.scale.y = 1;
    this.setSvActor();
  } else {
    const hue = this._battler.battlerHue();
    Sprite_Battler.prototype.setHue.call(this, hue);
    const bitmapWidth = this.bitmap.width;
    const bitmapHeight = this.bitmap.height;
    const contentsWidth = this.maxWidth;
    const contentsHeight = this.maxHeight;
    let scale = 1.0;
    if (bitmapHeight > contentsHeight) {
      scale = Math.min((contentsHeight / bitmapHeight), 1.0);
    }
    if (bitmapWidth > contentsWidth) {
      scale = Math.min((contentsWidth / bitmapWidth), scale);
    }
    this.scale.x = scale;
    this.scale.y = scale;
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
  }
};

Sprite_BookEnemy.prototype.update = function() {
  if (this.bitmap && this._svEnemy) {
    if (++this._motionCount >= this.motionSpeed()) {
      this._pattern = (this._pattern + 1) % 4;
      this.setSvActor();
      this._motionCount = 0;
    }
  } else if (!this.bitmap && this._svEnemy) {
    this._svEnemy = false;
  }
};

Sprite_BookEnemy.prototype.setSvActor = function() {
  const motionIndex = this._battler.enemy().meta.EB_SVBattlerMotion ? Number(this._battler.enemy().meta.EB_SVBattlerMotion) : 0;
  const pattern = this._pattern < 3 ? this._pattern : 1;
  const cw = this.bitmap.width / 9;
  const ch = this.bitmap.height / 6;
  const cx = Math.floor(motionIndex / 6) * 3 + pattern;
  const cy = motionIndex % 6;
  this.setFrame(cx * cw, cy * ch, cw, ch);
  const hue = this._battler.battlerHue();
  Sprite_Battler.prototype.setHue.call(this, hue);
};

Sprite_BookEnemy.prototype.motionSpeed = function() {
  return 12;
};

Sprite_BookEnemy.prototype.enemyBattlerName = function() {
	return this._battler.battlerName();
};

Sprite_BookEnemy.prototype.enemySVBattlerName = function() {
	return this._battler.enemy().meta.EB_SVBattler;
};

Sprite_BookEnemy.prototype.resetSVEnemy = function() {
  this._svEnemy = false;
};

Sprite_BookEnemy.prototype.setMaxWidth = function(width) {
  this.maxWidth = width;
};

Sprite_BookEnemy.prototype.setMaxHeight = function(height) {
  this.maxHeight = height;
};

if (NRP_pLoopLR) {
  Window_EnemyBookPageCategory.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && horizontal))) {
        this.smoothSelect((index + 1) % maxItems);
    }
  };

  Window_EnemyBookPageCategory.prototype.cursorLeft = function(wrap) {
    const index = Math.max(0, this.index());
    const maxItems = this.maxItems();
    const maxCols = this.maxCols();
    const horizontal = this.isHorizontal();
    if (maxCols >= 2 && (index > 0 || (wrap && horizontal))) {
        this.smoothSelect((index - 1 + maxItems) % maxItems);
    }
  };
}

function Game_EnemyBookCharacter() {
  this.initialize(...arguments);
}

Game_EnemyBookCharacter.prototype = Object.create(Game_Character.prototype);
Game_EnemyBookCharacter.prototype.constructor = Game_EnemyBookCharacter;

Game_EnemyBookCharacter.prototype.initialize = function(id) {
  Game_Character.prototype.initialize.call(this);
  this._enemyId = id;
  this.setStepAnime(true);
  this.refresh();
};

Game_EnemyBookCharacter.prototype.refresh = function() {
  const enemy = $dataEnemies[this._enemyId];
  if (enemy && enemy.meta.EnemyBookCharacter) {
    const data = enemy.meta.EnemyBookCharacter.split(',');
    const characterName = String(data[0]);
    const characterIndex = Number(data[1]);
    this.setImage(characterName, characterIndex);
    this.setDirection(Number(data[2]) || 0);
  } else {
    this.setImage("", 0);
  }
};

Game_EnemyBookCharacter.prototype.setPosition = function(x, y) {
  this._bookEnemyX = x;
  this._bookEnemyY = y;
};

Game_EnemyBookCharacter.prototype.screenX = function() {
  return this._bookEnemyX;
};

Game_EnemyBookCharacter.prototype.screenY = function() {
  return this._bookEnemyY;
};

function Sprite_EnemyBookCharacter() {
  this.initialize(...arguments);
}

Sprite_EnemyBookCharacter.prototype = Object.create(Sprite_Character.prototype);
Sprite_EnemyBookCharacter.prototype.constructor = Sprite_EnemyBookCharacter;

Sprite_EnemyBookCharacter.prototype.initialize = function(character) {
  Sprite_Character.prototype.initialize.call(this, character);
};

Sprite_EnemyBookCharacter.prototype.setCharacter = function(character) {
  this._character = character;
};

Sprite_EnemyBookCharacter.prototype.update = function() {
  if (this.visible) {
  Sprite_Character.prototype.update.call(this);
    this._character.updateAnimation();
  }
};
})();
