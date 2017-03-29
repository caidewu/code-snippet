
let defaultOptions = {
  MILESTONE : `${options.MILESTONE}`,
  TASK : `${options.TASK}`,
  PROJECT : `${options.PROJECT}`,
  MEMBER : "成员",
  FILTER : `${options.FILTER}`,
  TEAM : `${options.TEAM}`,
  OWNER : "创建者",
  REPORT : `${options.REPORT}`,
  TARGET : "目标",
  priority : `${options.PRIORITY}`,
  createTime : "创建时间",
}

var base = require("./base.js");
module.exports = {
  resources : Object.assign({},base,teamResource()),
  teamResource : teamResource,
  moment : function(moment){
    return {
      months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
      monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
      weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
      weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
      weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
      longDateFormat : {
        LT : 'Ah点mm分',
        LTS : 'Ah点m分s秒',
        L : 'YYYY-MM-DD',
        LL : 'YYYY年MM月D日',
        LLL : 'YYYY年MMMD日Ah点mm分',
        LLLL : 'YYYY年MMMD日ddddAh点mm分',
        l : 'YYYY-MM-DD',
        ll : 'YYYY年MM月DD日',
        lll : 'YYYY年MM月DD日Ah点mm分',
        llll : 'YYYY年MM月DD日ddddAh点mm分'
      },
      workinghours: {
        0: null,
        1: ['09:00:00', '17:00:00'],
        2: ['09:00:00', '17:00:00'],
        3: ['09:00:00', '17:00:00'],
        4: ['09:00:00', '17:00:00'],
        5: ['09:00:00', '17:00:00'],
        6: null
      },
      holidays:[],
      meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
      meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
          hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
          meridiem === '上午') {
          return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
          return hour + 12;
        } else {
          // '中午'
          return hour >= 11 ? hour : hour + 12;
        }
      },
      meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
          return '凌晨';
        } else if (hm < 900) {
          return '早上';
        } else if (hm < 1130) {
          return '上午';
        } else if (hm < 1230) {
          return '中午';
        } else if (hm < 1800) {
          return '下午';
        } else {
          return '晚上';
        }
      },
      calendar : {
        sameDay : function () {
          return '[今天]';
        },
        nextDay : function () {
          return '[明天]';
        },
        lastDay : function () {
          return '[昨天]';
        },
        nextWeek : function () {
          var startOfWeek, prefix;
          startOfWeek = moment().startOf('week');
          prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[下]' : '';
          return this.minutes() === 0 ? prefix + 'ddd' : prefix + 'ddd';
        },
        lastWeek : function () {
          var startOfWeek, prefix;
          startOfWeek = moment().startOf('week');
          prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
          return this.minutes() === 0 ? prefix + 'ddd' : prefix + 'ddd';
        },
        sameElse : function(){
          var currentYear = moment().year();
          if(this.year() == currentYear){
            return "MM月DD日";
          }else{
            return "YYYY年MM月DD日";
          }
        }
      },
      ordinalParse: /\d{1,2}(日|月|周)/,
      ordinal : function (number, period) {
        switch (period) {
          case 'd':
          case 'D':
          case 'DDD':
            return number + '日';
          case 'M':
            return number + '月';
          case 'w':
          case 'W':
            return number + '周';
          default:
            return number;
        }
      },
      relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
      },
      week : {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
      }
    }
  },
  dhxgantt: {
    config: {
      day_date: "%M %d日 %D",
      default_date: "%Y年 %M %d日",
      month_date: "%Y年 %M",
    },
    locale: {
      date: {
          month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
          day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
          day_short: ["日", "一", "二", "三", "四", "五", "六"]
      },
      labels: {
          dhx_cal_today_button: "今天",
          day_tab: "日",
          week_tab: "周",
          month_tab: "月",
          new_event: "新建日程",
          icon_save: "保存",
          icon_cancel: "关闭",
          icon_details: "详细",
          icon_edit: "编辑",
          icon_delete: "删除",
          confirm_closing: "请确认是否撤销修改!",
          confirm_deleting: "是否删除日程?",
          section_description: "描述",
          section_time: "时间范围",
          section_type: "类型",
          column_text: `${options.TASK}名`,
          column_start_date: "开始时间",
          column_duration: "持续时间",
          column_add: "",
          link: "关联",
          confirm_link_deleting: "将被删除",
          link_start: " (开始)",
          link_end: " (结束)",
          type_task: `${options.TASK}`,
          type_project: `${options.PROJECT}`,
          type_milestone: `${options.MILESTONE}`,
          minutes: "分钟",
          hours: "小时",
          days: "天",
          weeks: "周",
          months: "月",
          years: "年",
          message_ok: "OK",
          message_cancel: "关闭"
      }
    }
  }
}


function teamResource(options){
  options = Object.assign({},defaultOptions,options);
  return {
    common: {
      button: {
        ok: "确定",
        download: "下载",
        delete: "删除",
        deleteConfirm: "确认删除",
        confirm: "确认",
        cancel: "取消",
        remove: "移除",
        submit: "提交",
        back: "返回",
        change: "更改",
        gotit: "知道了",
        next: "下一步",
        create: "创建",
        upload: "更新",
        close: "关闭",
      },
      status: {
        loading: "加载中...",
        canceled: "已取消",
      },
      enums:{
        priority:{
          3:"普通",
          2:"重要",
          1:"紧急",
          0: "无",
        },
        expiry: {
          1: '已过期',
          2: '一周内',
          3: '一个月内',
          4: '更晚时间',
          5: '无截止日期',
        },
      },
      filter:{
        conditionType:{
          milestone:`所属${options.MILESTONE}`,
          project: `所属${options.PROJECT}`,
          projectStatus: `${options.TASK}状态`,
          projectAssign: `${options.TASK}负责人`,
          projectOwner: `${options.TASK}创建者`,
          projectPriority: `${options.PRIORITY}`,
          deadline:"截止日期",
          createTime:"创建时间",
          serverUpdateStamp:"更新时间",
          tag:"标签",
          file: `${options.TASK}文件`
        },
        setting:{
          renameFilter: `重命名${options.FILTER}`,
          renameConfirm: `请输入新的${options.FILTER}名`,
          deleteFilter: `删除${options.FILTER}`,
          deleteConfirm: `你确定要删除${options.FILTER}吗?`,
          saveAsConfirm:"另存为"

        },
        timeState:{
          placeholder:"天",
          equal:"等于",
          isHaveDeadline:"有截止日期",
          isNotHaveDeadline:"无截止日期",
          gt:"大于等于",
          lt:"小于等于",
          between:"介于",
          isDead:"已过期",
          notDead:"未过期",
          deadTimes:"已过期天数大于",
          willDeadTimes:"X天内过期",
          beforeTimes:"过去X天前",
          afterTimes:"过去X天后",
          startTimePlaceholder:"开始时间",
          endTimePlaceholder:"截止时间",
        },
        tag:{
          include:"包含",
          notInclude:"不包含",
          have: `有${options.TASK}标签`,
          notHave: `无${options.TASK}标签`,
          placeholder:"标签名"
        },
        file:{
          have:"有文件",
          notHave:"没有文件"
        },
        isConfirm:{
          yes:"等于",
          no:"不等于"
        },
        projectStatus:{
          complete:"已完成",
          incomplete:"未完成"
        },
        projectPriority:{
          urgent:"紧急",
          important:"重要",
          normal:"普通"

        },
        sort:{
          create_time:"创建时间",
          server_update_stamp:"修改时间",
          priority: `${options.PRIORITY}`,
          deadline:"截止日期",
          status: `${options.TASK}状态`,
          complete_time:"完成时间"
        },
        nothing:"无",
        unSupport:"该过滤条件无效",
        preview:"预览",
        refresh:"刷新",
        haveNewTaskUpdate:"列表有更新，点击查看",
        emptyCondition: `无过滤条件(显示全部${options.TASK})`,
        addConditionGroup:"添加条件组",
        conditionBar: `已选过滤条件 %{filtersNum} 个,匹配共 %{projectNum} 条${options.TASK}`,
        editCondition:"编辑过滤条件",
        condition:"添加条件",
        getFilterError: `获取${options.FILTER}失败`,
        apply:"应用",
        saveAs: `保存${options.FILTER}`,
        seveSuccess: `保存${options.FILTER}成功`,
        seveError: `保存${options.FILTER}失败`,
        renameSuccess:"重命名成功",
        removeSeccess:"删除成功",
        defaultFilterName: `我负责的${options.TASK}`,
        addFilterName: `新增${options.FILTER}`,
        filterName: `${options.FILTER}名`,
        reset:"清空",
        reDefault:"重置",
        hide:"收起",
        show:"展开",
        orlable:"或者",
        addSuccess: `添加${options.FILTER}成功`
      },
      report : {
        choiceAgain : "重新选择",
        choice : "选择",
        chooseFrequency : "选择周期",
        frequencyTitle : "周期",
        chooseTarget : "选择活跃指标",
        chooseDataFilter : "选择数据源",
        noData : `没有${options.REPORT}数据`,
        noDataTips : `请选择数据源生成数据${options.REPORT}`,
        targetTitle : "活跃指标",
        silence: `* 沉默${options.TASK} : 30天内没有更新的未完成${options.TASK}`,
        target:{
          completed_task:"已完成",
          created_task:"已创建"
        },
        frequency : {
          today : "今天",
          yesterday : "昨天",
          lastWeek : "最近一周",
          lastMonth : "最近一个月",
          all : "全部"
        },
        generateReport : `生成${options.REPORT}`,
        chartPanelHeader : `${options.REPORT}详情`,
        backToTeamReport : `返回${options.TEAM}数据中心`,
        reportType : `${options.REPORT}类型`,
        reportDesc : `${options.REPORT}描述`,
        projectHealthy : {
          name : `${options.PROJECT}健康度${options.REPORT}`,
          intro : `${options.PROJECT}健康${options.REPORT}以柱状图形式显示${options.PROJECT}的${options.TASK}总体进度和${options.TASK}类型的构成，支持指定${options.PROJECT}的对比，帮你快速呈现出${options.TEAM}${options.PROJECT}的健康度情况`
        },
        teamMemberActivity : {
          name : "成员活跃排行",
          intro : `成员活跃排行${options.REPORT}以柱状图形式显示${options.TEAM}成员的活跃排行，支持指定${options.PROJECT}和周期，帮你快速呈现出${options.TEAM}成员的关键活跃数据`
        },
        teamActivity : {
          name : `${options.TEAM}活跃日历`,
          intro : `${options.TEAM}活跃日历${options.REPORT}以热力图形式显示${options.TEAM}成员每天的活跃情况，支持指定${options.PROJECT}和活跃指标，帮你快速呈现出${options.TEAM}和${options.PROJECT}每天总体的活跃趋势`
        },
        teamManhour: {
          name: `${options.TEAM}工时${options.REPORT}`,
          intro: `${options.TEAM}工时${options.REPORT}以表格形式显示${options.TEAM}的工作登记流水，支持指定数据源以及多种维度查看方式，帮你快速呈现出${options.TEAM}工作的效率情况`,
        }
      },
      milestone : {
        status : {
          deleted : "已删除",
          completed : "已完成",
          inProgress : "进行中",
          notReady : "未开始"
        }
      },
      upload: {
        fileName:"文件名",
        fileDesc:"文件描述",
        fileDescPlaceholder:"输入文件描述(选填)",
        fileNameNotNull:"上传文件名不得为空",
        uploadTitle:"上传附件",
        uploading: "上传中...",
        cancelUpload: "取消上传",
        failed: "上传失败",
        succeded: "上传成功",
        retry: "上传失败，请重试",
      },
      text: {
        role:{
          root: `${options.TEAM}创建者`,
          teamMember : `${options.TEAM}成员`,
          teamAdministrator: `管理${options.TEAM}成员`,
        },
        permission : {
          viewTeamReport : {
            title : `查看${options.TEAM}${options.REPORT}`,
            desc : `可以查询当前${options.TEAM}的各个${options.REPORT}`
          },
          inviteTeamMember : {
            title : "邀请新成员",
            desc : `可以邀请新的${options.TEAM}成员加入${options.TEAM}`
          },
          removeTeamMember : {
            title : `移除${options.TEAM}成员`,
            desc : `可以将成员从${options.TEAM}中移除`
          },
          editTeamInfo : {
            title : `编辑${options.TEAM}信息`,
            desc : `可以编辑${options.TEAM}的基础显示信息`
          },
          manageOrgChart : {
            title : "管理组织架构",
            desc : `可以管理${options.TEAM}的组织架构，更改成员的所属部门`
          },
          manageMilestone: {
            title : `创建${options.MILESTONE}`,
            desc : `可以创建新的${options.MILESTONE}`
          },
        },
        permissionCategory : {
          team_info : `${options.TEAM}信息`,
          team_member : `${options.TEAM}成员`,
          team_report : `${options.TEAM}${options.REPORT}`,
          milestone: `${options.MILESTONE}`,
        },
        etc: "等",
        leftQuoteMark: "「",
        rightQuoteMark: "」",
        or: "或",
        // external: "BangWork,让你更好更快的实现工作目标",
        task: `${options.TASK}`,
        chat : "会话",
        project: `${options.PROJECT}`,
        milestone: `${options.MILESTONE}`,
        owner: "创建者",
        link: "链接",
        qrcode: "二维码",
        personal: "个人",
        team: `${options.TEAM}`,
        verifyCode: "验证码",
        signup: "注册",
        title: "职位",
        departments:"部门",
        roles : "角色",
        email: "邮箱",
        phone: "手机号",
        NA: "无",
        noMoreTips : "没有更多了",
        newSection : "新分类",
        importantTaskMsg:"紧急",
        retry : "重试",
        overview: "概览",
        updates: "动态",
        conversation: "会话",
        files: "文件",
        members: "成员",
        account : "帐号",
        attrUnset: "未设置",
        noAccess: "无权限",
        status: "状态",
        self: "自己",
        remark: "备注",
      },
      error: {
        api403: "你没有操作的权限",
        api801: "提交资料有误",
        api609: `${options.PROJECT}不存在`,
        api630: `没有找到${options.PROJECT}模板`,
        api810: `非${options.PROJECT}成员,无权限查看`,
        manhour403:"你不是该工时创建者,无权限修改",
        manhour630:"找不到该工时记录",
        manhour610: `找不到该${options.TASK}`,
        manhour801:"参数不合法",
        manhour810: `你不是该${options.TASK}所属${options.PROJECT}成员`,
        manhour803:"无任何修改",
        gantt610: `找不到${options.TASK}`,
        gantt630:`${options.TASK}没有所属${options.MILESTONE}或者找不到该${options.TASK}所属的甘特图数据`,
        gantt801:"参数不合法",
        ganttFrontTaskNotNull: `前置${options.TASK}不能为空`,
        fileParamsError:"当前文件名或文件描述不合法，请修改后重新提交",
        fileNotFound:"该文件不存在或已被删除",
        teamNotFound: `${options.TEAM}信息不存在请重新登陆`,
        errServerError: "网络出现问题，请刷新界面后重试",
        ticketNotValid : "身份凭证无效",
        ticketExpired : "身份凭证过期",
        noPermission : "没有权限进行此操作，请联系管理员",
        notFoundTask: `${options.TASK}没有权限访问或已被删除`,
        notFoundMilestone : `${options.MILESTONE}没有权限访问或已被删除`,
        notFoundMilestoneGantt : `${options.MILESTONE}甘特图没有权限访问或已被删除`,
        notFoundProject: `${options.PROJECT}没有权限访问或已被删除`,
        auth: {
          errNameEmpty : "姓名不能为空",
          errPasswordEmpty : "密码不能为空",
          errEmailFormatWrong: "请填写正确的Email地址",
          errPasswordFormatWrong: "请填写至少8位数字、字母及下划线的组合",
          errAlreadyRegister: "用户已经注册，请直接登录",
          errVerifyCodeWrong: "请填写正确的验证码",
          errVerifyCodeInvalid: "验证码无效",
          errVerifyCodeExpired: "验证码已过期",
          errAccountNotFound: "该账号未注册",
          errInviteCodeInvalid: "邀请码无效",
          errInviteCodeWrong: "邀请码不正确",
          errInviteAlready: `你已经加入了一个正式${options.TEAM}，不能再加入其它${options.TEAM}了`,
          errInviteCodeExpired: "邀请码过期",
          errTeamNotFound: `${options.TEAM}不存在`,
          errTeamisFull: `${options.TEAM}已满，无法加入`,
        },
        task:{
          changeOrderFail:"调整顺序失败，请刷新界面"
        }
      },
      placeholder: {
        text: "未设置",
        select: "未设置",
      },
    },
    model: {
      taskColumns: {
        summary: `${options.TASK}标题`,
        start_date: "开始时间",
        end_date: "结束时间",
        duration: "工期",
        assignee: "负责人",
      }
    },
    leftPanel : {
      follow : "我关注的",
      project : `${options.PROJECT}列表`,
      filter: `${options.FILTER}`,
      teamReport : `${options.TEAM}数据中心`,
      smallTeamReport:"统计",
      search:"搜索",
      milestone:`${options.MILESTONE}`,
      viewAllMilestones: `查看所有${options.MILESTONE}`,
      viewAllProjects: `查看所有${options.PROJECT}`,
    },
    leftSmallPanel:{

    },
    mainPanel : {
      showInfo : "查看",
      sort : {
        _default:"默认排序"
      },
      addTask : {
        placeholder : `添加${options.TASK}...`,
        assigneeSelectHeader: `把${options.TASK}指派给...`,
      },
      editProject : {
        title : {
          normal : `${options.PROJECT}信息`,
          editing : `编辑${options.PROJECT}信息`
        },
        "delete" : `删除${options.PROJECT}`,
        exit : "退出",
        edit : "编辑",
        save : "保存更改",
        name : `${options.PROJECT}名称`,
        notice : `${options.PROJECT}公告`,
        placeholder:{
          name : `输入${options.PROJECT}名`,
          notice : `输入${options.PROJECT}公告`
        }
      }
    },
    sidePanel : {
      project:{
        header : {
          discussion: `${options.PROJECT}讨论`,
          files : `${options.PROJECT}文件`,
          members : `${options.PROJECT}成员`
        },
        fileEmptyText: "没有文件",
        fileEmptySubText : `当前${options.PROJECT}暂无${options.PROJECT}文件`
      },
    },
    components: {
      redirectDialog : {
        errorTitle : "操作提示",
        errorContent : "当前页面的访问权限已经发生变化，请稍候再试，您可以访问:",
        to:{
          myFilter : `我负责的${options.TASK}`,
          milestoneList : `${options.MILESTONE}列表`,
          projectList : `${options.PROJECT}列表`
        }
      },
      taskMultipleOperation : {
        operationLabel : {
          assign : `${options.TASK}负责人`,
          priority : `${options.PRIORITY}`,
          status : `${options.TASK}状态`,
          milestone : `${options.MILESTONE}`
        },
        label : "批量操作 (%{count})",
        dialog : {
          title : `确认批量操作选中${options.TASK}吗？`,
          msg : `将 %{attr} 修改为 %{value} ，共 %{count} 条${options.TASK}`
        },
        success : `批量修改${options.TASK}成功`,
        error : `批量修改${options.TASK}失败`
      },
      taskKanban : {
        cannotMove : "当前分类下不支持手动排序"
      },
      milestoneInputSelectWidget : {
        emptyList : `您还未加入任何${options.MILESTONE}`,
        noFilterResult : `没有匹配的${options.MILESTONE}`
      },
      projectUnreadTag:{
        unread : "未读",
        hasNewMessage : "有新消息",
        hasNewAttachment : "有新文件",
        ignore : "忽略"
      },
      taskOrderChangeFailNotification : {
        task : `调整${options.TASK} %{target} 中的子${options.TASK}顺序失败`,
        project : `调整${options.PROJECT} %{target} 中的${options.TASK}顺序失败`,
        myTask : `调整我的${options.TASK}中的${options.TASK}顺序失败`,
      },
      projectSelect : {
        title : `选择${options.PROJECT}`,
        selectedProject :"已选%{projectNumber}个",
        selectAll : "全选",
        searchBarPlaceholder: `搜索${options.PROJECT}...`,
        nothing: `没有匹配的${options.PROJECT}`,
        members:"成员"
      },
      inputEditor : {
        doEditText : "更改",
        emptyText : "未填写"
      },
      passwordValidator : {
        tips : "为确认是您本人操作，请输入当前帐户密码并继续",
        placeholder : "当前帐户密码",
        error : {
          oldPasswordEmpty : "旧密码不能为空",
          oldPasswordNotValid : "旧密码格式不正确",
          oldPasswordNotCorrect : "旧密码不正确",
        }
      },
      globalAlert : {
        confirm : "确定"
      },
      advanceSetting:{
        title : "模版设置"
      },
      templateNameDialog:{
        placeholder:"请输入模版名",
        title : "请输入模版名"
      },
      projectTypeChoose:{
        myTemplateTag : "我的模版",
        use : "使用",
        createNewProject: `创建新${options.PROJECT}`,
        systemTemplate : "从模版库选择",
        moreTemplate : "更多模版",
        emptyProject : `普通${options.PROJECT}`,
        selectProjectType : `选择${options.PROJECT}类型`,
        confirmDelete : "确认删除模版",
        modelSummary : {
          attr : `%{number}个${options.PROJECT}属性`,
          target : `${options.PROJECT}目标`,
          desc : `默认${options.TASK}描述`
        }
      },
      sectionEditor:{
        desc: `设置${options.TASK}描述模版`,
        attr: `设置${options.TASK}属性模版`,
        goal: `设置${options.PROJECT}目标`,
        manhour : `设置${options.PROJECT}工时`,
        edit : "编辑",
        editing : "编辑中"
      },
      taskDetailPreview : {
        title : `${options.TASK}详情预览`,
        exampleTask : {
          summary : `这是一个示例${options.TASK}`,
          exampleText : "示例文本",
          exampleChoice : "示例选项",
          exampleMilestone : `示例${options.MILESTONE}`
        }
      },
      templateEditor:{
        attr : {
          header : `${options.TASK}属性`,
          namePlaceholder : "请输入属性名",
          addConfirm : "确认添加",
          editConfirm : "确认",
          dateTips : "例：入职时间：12月12日",
          dateTimeTips : "例：入职时间：11月11日 11:11:11",
          milestoneTips : "例：影响版本",
          option : "选项",
          defaultOption : "默认",
          setDefault : "设为默认",
          cancelDefault : "取消默认",
          addAttr : "添加属性",
          addChoice : "添加选项",
          textPlaceholder : "默认文本",
          numberPlaceholder : "默认数值",
          errEmptyName : "属性名不能为空",
          errEmptyOptions : "请至少添加一个选项",
          errEmptyOptionName : "选项名称不能为空",
          type : {
            1:"选项菜单",
            2:"文本框",
            3:"数值",
            4:"数值",
            5:"日期格式",
            6:"时间格式",
            7:`${options.MILESTONE}`
          }
        },
        target : {
          notValid : `信息不完整，${options.PROJECT}目标未生效`,
          submit : "确认",
          header : `设置${options.PROJECT}目标`,
          nameTips : "例：销售额",
          scoreTips : "例：1000",
          unitTips : "例：元"
        },
        desc : {
          header : `设置初始${options.TASK}描述`,
          placeholder : `请输入默认的${options.TASK}描述`
        },
        manhour : {
          header : `设置${options.PROJECT}工时`,
          label : `在本${options.PROJECT}中启用工时模块`
        },
        btnKeyField: "在列表中显示",
        btnEdit: "修改",
        btnDelete: "删除",
        footerTips: "注：在列表中显示属性最多选择两个",
      },
      avatarUpload: {
        chooseImg: "选择图片",
        fileTipsLine1: "只支持JPG、PNG,",
        fileTipsLine2: "大小不超过5M",
        chooseAgainImg: "重新选择图片",
      },
      dragndropFiles: {
        coverMessage: "拖拽文件到此上传",
      },
      discussionPanel:{
        emptyTitle : "没有会话",
        emptySubtitle : `在这里可以发起${options.PROJECT}讨论`
      },
      uploadConfirmView: {
        uploadFileTitle: "确认上传文件？",
      },
      editorChatInput: {
        discussion: "讨论",
        discussionFocus: `可以使用@提及${options.PROJECT}成员，Ctrl+V直接粘贴图片`,
        send: "发送",
        upload: "上传附件",
      },
      fileList: {
        deleteConfirmMsg: "确认要删除该文件？",
        uploader: "来自",
      },
      filePreview: {
        preview : "预览%{name}",
        noReviewLabel: "当前文件不支持预览",
        download: "下载",
        uploadedLabel: "上传时间 ",
        addDesc:"无",
        positionLabel:"位置",
        sizeLabel: "大小",
        typeLabel:"类型",
        descTitle:"文件描述: ",
        position:"位置 :",
        fileType:{
          music:"音频",
          image:"图片",
          video:"视频",
          word:"文档",
          xls:"表格文件",
          ppt:"演示文稿",
          pdf:"文档",
          zip:"压缩文件",
          txt:"文档",
          default:"其他类型"
        }
      },
      formComponent: {
        codeRetryTime: "%{seconds}秒后重取",
      },
      log: {
        attachAdd: "上传了附件",
        attachRemove: "移除了附件",
        task: `${options.TASK}`,
        subTask : `子${options.TASK}`,
        priority: `将${options.TASK}${options.PRIORITY}设置为`,
        project: `${options.PROJECT}`,
        archive: `归档${options.PROJECT}`,
        setDeadline: "设置了%{objectName}的截止时间",
        clearDeadline: "移除了截止时间",
        editTaskSummary: `编辑了${options.TASK}名称`,
        editTaskDesc: `编辑了${options.TASK}描述`,
        editProjectAnnounce: `编辑了${options.PROJECT}公告`,
        removeProjectAnnounce: `移除了${options.PROJECT}公告`,
        taskAssign1: "将",
        taskAssign2: `设为${options.TASK}负责人`,
        projectOwner1:"将",
        projectOwner2: `设为${options.PROJECT}负责人`,
        taskStatusClose: "完成了",
        taskStatusReopen: "重启了",
        editProjectName: `编辑了${options.PROJECT}名称`,
        addProjectMember1: "邀请",
        addProjectMember2: `加入${options.PROJECT}`,
        exitProjectMember: `退出了${options.PROJECT}`,
        removeProjectMember1: "将",
        removeProjectMember2: `移出了${options.PROJECT}`,
        hideLabel: "收起",
        showLabel: "查看",
        createdLabel: "创建了",
        deletedLabel: "删除了",
        addRelatedLabel: `新增关联${options.TASK} `,
        deleteRelatedLabel: `取消关联${options.TASK} `,
        addTags : `添加了${options.TASK}标签：`,
        removeTags : `删除了${options.TASK}标签：`,
        archived: `已将${options.PROJECT}归档`,
        notArchived: `撤销了${options.PROJECT}归档`,
        moveOut:"移出了",
        moveIn:"移入了",
        moveTask1: `将${options.TASK}`,
        moveTask2: `%{action}${options.PROJECT}`,
        deleteTaskTarget: `删除了${options.TASK}目标`,
        updateTaskTarget: `设置了${options.TASK}目标：%{value}%{unit}`,
        deleteProjectTarget: `删除了${options.PROJECT}目标`,
        updateProjectTarget: `设置${options.PROJECT}目标为 %{name}：%{value}%{unit}`,
        updateTaskAttributes: `编辑了${options.TASK}属性`,
        addBoard: "添加了分类 %{board}",
        updateBoard: "编辑了分类名称",
        deleteBoard: "删除了分类 %{board}",
        moveTaskFromToBoard: `将${options.TASK}从分类 %{oldBoard} 移动到 %{newBoard}`,
        moveTaskToBoard: `将${options.TASK}移动到分类 %{newBoard}`,
        moveTaskToMilestone: `将${options.TASK}移入${options.MILESTONE}`,
        moveTaskOutOfMilestone: `将${options.TASK}移出${options.MILESTONE}`,
        deleteTaskAssessManhour : "移除了预估工时",
        updateTaskAssessManhour : `将${options.TASK}预估工时设置为 %{time} 小时`,
        addManhour : "登记了工时记录",
        updateManhour : "更新了工时记录",
        deleteManhour : "删除了工时记录",
        manhour:{
          startTime : "开始时间",
          hours : `${options.TASK}耗时`,
          remark : "备注",
        },
        error:{
          taskDeleted: `${options.TASK}已被删除！`,
          projectDeleted: `${options.PROJECT}已被删除！`,
          projectNoAccess: `没有访问该${options.PROJECT}的权限`,
          milestoneDeleted: `${options.MILESTONE}已被删除！`,
          milestoneNoAccess: `没有访问该${options.MILESTONE}的权限`,
        }
      },
      messageLogPanel: {
        fetchMoreLabel: "查看更早的消息",
      },
      projectMember: {
        owner: `${options.PROJECT}负责人`,
        deleteConfirmMsg: `确认要将该成员从${options.PROJECT}中移除吗？`,
      },
      taskItem: {
        overdue: "已过期%{days}天",
        assignSelectHeader: `把${options.TASK}指派给...`,
        attrUnset: "未设置",
        subTaskCompleted : `子${options.TASK}完成度：%{completed}/%{total}`
      },
      ganttViewModeDialog:{
        queryToMilestone:`进入${options.MILESTONE}`,
        milestoneSetting:`${options.MILESTONE}设置`,
        viewTimeUnit:{
          title: "时间：",
          day: "按天数",
          month: "按月份",
        },
        showWorkDay:{
          title: "显示：",
          allday:"整周",
          workday:"工作日"
        },
        ganttColumnOptionTitle: "管理列",
      },
      taskList: {
        completed: "已完成",
      },
      taskListViewModeDialog: {
        header: `${options.PROJECT}视图`,
        mainMode: "分类：",
        mainState: "筛选：",
        groupBy:{
          default: "默认分类",
          assignee: `按${options.TASK}负责人`,
          priority: `按${options.TASK}${options.PRIORITY}`,
          deadline: `按${options.TASK}截止日期`,
          createTime: `按${options.TASK}创建日期`,
          milestone: `按${options.MILESTONE}分类`,
          attributes: "按属性分类",
        },
        taskViewState: {
          viewMode: '查看${options.TASK}状态',
          incompleted: '只看未完成${options.TASK}',
          completed : `只看已完成${options.TASK}`,
          all: '查看所有${options.TASK}',
          projectSetting: `${options.PROJECT}设置`,
          listMode:"列表",
          boardMode:"看板",
          ganttMode:"甘特图",
          chooseMode:"视图：",
        },
        pinStatus : {
          pin : `置顶${options.PROJECT}`,
          unpin : "取消置顶"
        }
      },
      milestoneViewModeDialog : {
        mainMode: "分类：",
        mainState: "筛选：",
        groupBy:{
          project: `按${options.PROJECT}分类`,
          assignee: `按${options.TASK}负责人`,
          priority: `按${options.TASK}${options.PRIORITY}`,
          deadline: `按${options.TASK}截止日期`,
          createTime: `按${options.TASK}创建日期`,
        },
        taskViewState: {
          viewMode: '查看${options.TASK}状态',
          incompleted: '只看未完成${options.TASK}',
          completed : `只看已完成${options.TASK}`,
          all: '查看所有${options.TASK}',
          milestoneSetting:`${options.MILESTONE}设置`,
          listMode:"列表",
          boardMode:"看板",
          ganttMode:"甘特图",
          chooseMode:"视图：",
        },
        pinStatus : {
          pin : `置顶${options.MILESTONE}`,
          unpin : "取消置顶",
        }
      },
      taskBoard: {
        placeholder: '分类名称',
        errNameEmpty: '分类名称不能为空',
        errNameExceedLength: '分类名称长度不能超过%{length}个字符！',
        addBoard: "添加分类",
        multipleSelect : "批量操作",
        renameBoard: "重命名分类",
        deleteBoard: "删除分类",
        deleteBoardConfirm: "确认要删除分类？",
        addTask: `添加新${options.TASK}`,
        addTaskDisabled: `禁止添加${options.TASK}`,
        boardTooltip: "所属分类",

        emptyTaskText : `没有${options.TASK}`,
        emptyTaskIncompleteText: `没有未完成的${options.TASK}`,
        emptyTaskCompletedText : `没有已完成的${options.TASK}`,

        deleteWarn:{
          ok:"知道了",
          boardNotEmpty: `当前分类下还有${options.TASK}，请先清空此分类下的${options.TASK}，然后再删除此分类。`,
          boardNotEmptyWithBoardName: `当前分类 %{boardName} 下仍有${options.TASK}数据,请先清空此分类下的${options.TASK},然后再删除此分类`,
          completedCount: `已完成${options.TASK} `,
          incompletedCount: `未完成${options.TASK} `,
          boardNotEmptyAndOpenAll: `当前分类下还有${options.TASK}，请先查看所有${options.TASK}并清空此分类下的${options.TASK}，然后再删除此分类。`,
          defaultBoard: `${options.PROJECT}中至少要存在一个分类。`,
          boardNotEmptyOrDefaultBoard : `至少要存在一个分类或清空分类下${options.TASK}再删除`,
          projectOrBoardNotFound : `${options.PROJECT}或分类不存在`
        }
      },
      taskBoardList: {
        emptyText: `没有${options.TASK}`,
        emptySubText : `当前分类/筛选方式下没有${options.TASK}`,
        viewModeAll: `查看所有${options.TASK}`,
        viewModeIncompleted: `只看未完成${options.TASK}`,
      },
      projectBoardInput: {
        placeholder: "选择分类...",
        header: "更改分类...",
      },
      csmCard: {
        supportCardPhone: "「%{phone}」",
      },
      milestoneGanttChart: {
        sectionScheduled: `已计划${options.TASK}`,
        sectionUnscheduled: `未计划${options.TASK}`,
        emptyPlaceholder: `把${options.TASK}拖动到此处加入甘特图`,
        emptyPlaceholderReadOnly: `当前甘特图没有已计划${options.TASK}`,
        startTime: "开始时间",
        endTime: "完成时间",
        durationDays: "工期",
        assignee: "负责人",
        today:"今天",
        durationDaysText: "%{days}天",
        dateScaleStrForMonth: "%Y年%F",
        dateScaleStr: "%Y年%m月 第%W周",
        startTask : "开始 : ",
        endTask : "完成 : "
      },
      milestoneAddTaskDialog: {
        errTaskNameEmpty: `${options.TASK}标题不能为空`,
      }
    },
    pages: {
      milestoneMembersPanel : {
        addMemberBtn : `添加${options.MILESTONE}成员`
      },
      milestoneOverview : {
        taskSummary : {
          header : "进展",
          completed : `已完成${options.TASK}`,
          incomplete : `未完成${options.TASK}`,
          percentage : "完成率"
        },
        gantt: {
          header: "甘特图",
          targetDate: "计划完成时间",
          noTargetDate: "暂无计划日期",
          create: "创建甘特图",
          noData:"暂无数据",
          view: "查看甘特图",
        },
        date : {
          header : "日期",
          startTime : "开始日期",
          restTime : "(还有%{days}天开始)",
          endTime : "截止时间"
        },
        desc : {
          header : "描述"
        }
      },
      milestoneMain : {
        taskEmptyTitle : `没有${options.TASK}`,
        taskEmptySubTitle : `当前${options.MILESTONE}下暂无${options.TASK}`,
        updateStatusSuccess : `更改${options.MILESTONE}状态成功`,
        statusDialog : {
          title : `修改${options.MILESTONE}状态`
        },
        errorPinFail : `设置${options.MILESTONE}置顶失败`,
        errorUnpinFail : `取消${options.MILESTONE}置顶失败`,
        addTask : `创建${options.TASK}`,
        taskSummary : `${options.TASK}标题`
      },
      milestoneManager: {
        owner: `${options.MILESTONE}负责人`,
        errNoData: `无法获取${options.MILESTONE}信息`,
        errTitleEmpty: `${options.MILESTONE}名字不能为空`,
        errTitleExceedLength: `${options.MILESTONE}名字不能超过%{length}个字符`,
        errStartDateEmpty: "开始日期不能为空",
        errEndTimeBeforeStartTime: '截止日期不能早于开始日期',
        errMilestoneNotFound: `${options.MILESTONE}不存在`,
        errNotAMember: `不是${options.MILESTONE}成员`,
        addMilestone: `创建${options.MILESTONE}`,
        editMilestone: `设置${options.MILESTONE}`,
        milestoneMembers: `${options.MILESTONE}成员`,
        createMilestone: `创建${options.MILESTONE}`,
        editMilestone: `${options.MILESTONE}设置`,
        fieldTitle: `${options.MILESTONE}名称`,
        fieldStartTime: "开始日期",
        fieldEndTime: "截止日期",
        fieldDescription: `${options.MILESTONE}描述`,
        fieldMember: `${options.MILESTONE}参与者`,
        membersInTotal: "共%{count}人",
        membersSelectTotal: `选择${options.MILESTONE}成员（%{count}）`,
        hideLabel: "收起",
        quitConfirmMsg: `确认要从${options.MILESTONE}中退出吗？`,
        deleteMemberConfirmMsg: `确认要将该成员从${options.MILESTONE}中移除吗？`,
        quitLabel: `退出${options.MILESTONE}`,
        deleteLabel: `删除${options.MILESTONE}`,
        deleteConfirmTitle: `确定要删除${options.MILESTONE}吗？`,
        deleteConfirmMsg: `删除${options.MILESTONE}不会删除${options.MILESTONE}下的${options.TASK}，删除时会同时将${options.TASK}从当前${options.MILESTONE}中移除.`,
        transferLabel: "管理权转让",
        transferListHeader: `将${options.MILESTONE}管理权转让给`,
        noMemberToTransfer: `当前${options.MILESTONE}只有一个成员，无法直接转让管理权`,
        oldOwner:"现负责人: ",
        newOwner:"新负责人: ",
        chooseNewOwner:"选择新负责人",
        openGantt:"启用甘特图视图",
        ganttSetting:"甘特图设置"
      },
      milestoneMembers: {
        addMemberSearchPlaceholder: "输入昵称、邮箱查找成员",
        addMemberBtn: `添加${options.MILESTONE}成员`,
        selectMemberLabel: `选择${options.MILESTONE}成员`,
        addMemberAllLabel: "全选",
        removeMemberAllLabel:"取消全选",
      },
      milestoneList : {
        allMilestoneTitle:`全部${options.MILESTONE}`,
        title : `${options.MILESTONE}`,
        add : `添加${options.MILESTONE}`,
        name : `${options.MILESTONE}名称`,
        status : "状态",
        startTime : "开始时间",
        endTime : "截止时间",
        progress : "进展",
        allTask : `全部${options.TASK}`,
        incomplete : "未完成",
        completed : "已完成",
        emptyTitle : `没有${options.MILESTONE}`,
        emptySubTitle : `暂无${options.MILESTONE}数据，可以在此处查看${options.MILESTONE}状态`
      },
      profileRoleManager : {
        roleListView : {
          permissions : "拥有权限",
          memberCount : "当前成员数",
          addBtn :"添加角色",
          title : "角色列表"
        },
        editRoleView : {
          editRoleTitle:"编辑角色权限",
          addRoleTitle : "添加角色",
          viewRoleTitle : "角色权限",
          deleteRole : "删除角色",
          permissionManager : "权限管理",
          placeholder : "输入角色名...",
          errNameEmpty: '角色名字不能为空',
          errNameExists: '角色名字已存在',
          roleHaveNoPermission : "当前角色没有任何权限"
        },
        deleteRoleView : {
          title : "删除角色",
          tips : `您当前正在执行删除角色 %{oldRoleName} 的操作,删除后该角色下的所有成员的新角色将设置为默认的${options.TEAM}成员`,
          oldRole : "原角色",
          newRole : "新角色",
          confirmDeleteBtn : "确认删除"
        }
      },
      projectReport : {
        title : `${options.PROJECT}${options.REPORT}`,
        updateTime:"* 更新时间 :",
        targetEstimation:{
          day:"天",
          mainTitle: `${options.PROJECT}进展预估`,
          title : `预计完成${options.TASK}数`,
          tips : "创建于 %{time} (%{offset}天前)",
          creatCount:"每日创建数",
          completeCount:"每日完成数",
          avgCount:"平均完成天数",
          target:"目标预期",
          nullMsg: `当前${options.PROJECT}下暂无已完成${options.TASK}`,
        },
        taskOverview:{
          title: `${options.PROJECT}总体进度`,
          eTitle: `${options.TASK}数`,
          completeDesc:"当前已完成",
          complete:"已完成",
          incomplete:"未完成",
          stack:"合计",
          nullMsg: `当前${options.PROJECT}暂无进展`
        },
        memberActivity:{
          title: `${options.PROJECT}成员活跃统计`,
          nullMsg: `当前周期下暂无成员${options.TASK}数据`
        },
        attributeAnalysis:{
          eTitle:"销售额",
          title: `${options.PROJECT}属性分析`,
          chooseMsg:"请选择",
          nullMsg: `当前${options.PROJECT}未配置选项属性`
        },
        targetTrack:{
          title: `${options.PROJECT}目标追踪`,
          complete:"已完成",
          nowComplete:"当前已完成",
          overComplete:"超出目标",
          notOverComplete:"离目标还差",
          nullMsg: `当前${options.PROJECT}未设置${options.PROJECT}目标`,
          target:"目标:"
        }
      },
      teamReportDashboard : {
        title : `${options.TEAM}数据中心`,
        general : {
          advanceReport: `高级${options.REPORT}`,
          title : `${options.TEAM}总体概览`,
          project : {
            title : `${options.PROJECT}`,
            total : `总${options.PROJECT}数`,
            active : "活跃中",
            archive : "已归档"
          },
          task : {
            title : `${options.TASK}`,
            total : `总${options.TASK}数`,
            incomplete : "未完成",
            completed : "已完成",
            percentmsg: `${options.TASK}完成率`
          },
          member : {
            title : "成员",
            total : "总成员数",
            active : "活跃成员",
            notactive:"非活跃成员"
          }
        },
        tips : {
          project:{
            total : `总${options.PROJECT}数：${options.TEAM}中的所有${options.PROJECT}数，包含我未加入的${options.PROJECT}`,
            active : `活跃中${options.PROJECT}：${options.TEAM}中未归档的${options.PROJECT}总数`
          },
          task : `${options.TASK}完成率：${options.TEAM}已完成${options.TASK}数占${options.TEAM}${options.TASK}总数之间的百分比`,
          member : {
            active : "活跃成员：3天内有过登录的成员",
            inactive : "非活跃成员：3天内未登录的成员"
          }
        }
      },
      projectHealthyReport : {
        legend : {
          completed: `已完成${options.TASK}`,
          silence : `沉默${options.TASK}`,
          urgent : `紧急${options.TASK}`,
          overdue : `逾期${options.TASK}`,
          other : `其他${options.TASK}`
        },
        stack : {
          completed : `已完成${options.TASK}`,
          incomplete : `未完成${options.TASK}`
        }
      },
      teamMemberActivityReport : {
        legend : {
          created : `创建${options.TASK}`,
          completed : `完成${options.TASK}`
        }
      },
      teamActivityReport:{
        tooltips : {
          completed_task: `%{date}完成${options.TASK}数：%{count}`,
          created_task: `%{date}创建${options.TASK}数：%{count}`,
        }
      },
      teamManhourReport: {
        filterHeader: "1、过滤条件",
        groupHeader: "2、分组方式",
        groupBy: {
          day: "按天分组",
          week: "按周分组",
          month: "按月分组",
          user: "按成员分组",
          project: `按${options.PROJECT}分组`,
          milestone: `按${options.MILESTONE}分组`,
          task: `按${options.TASK}分组`,
        },
        totalElapsedTime: '总计登记 %{hours} 小时',
        totalEstimateTime: '总计预估 %{hours} 小时',
        viewModeData: "数据视图",
        viewModeStat: "统计视图",
        exportCsv: `导出${options.REPORT}`,
        resultLabel: "匹配结果：",
        resultCount: "%{count} 条",
        groupEstimateTime: "合计预估 %{time} 小时",
        groupTotalTime: "合计登记 %{time} 小时",
        manhourRow: {
          elapsed: "登记工时",
          startTime: "开始时间",
          project: `所属${options.PROJECT}`,
          task: `所属${options.TASK}`,
          elapsedHours: "%{hours} 小时",
          statusComplete: "已完成",
          statusIncomplete: "未完成",
          noneManhourData: "暂无工时登记记录",
        },
      },
      createTeam : {
        backToLogin : "已有账号？请登录",
        request : "申请使用，获取兑换码",
        pageTitle : `创建${options.TEAM}`,
        "error" : {
          codeEmpty : "兑换码不能为空",
          codeInvalid : "兑换码已被使用",
          codeExpired : "兑换码已过期",
          codeNotExist : "兑换码不正确",
          emailExist : "邮箱已被注册"
        },
        step1 : {
          title : `欢迎创建${options.TEAM}`,
          tips : `请输入ONES.AI${options.TEAM}兑换码`,
          codePlaceholder : "请填写兑换码",
          teamName : `公司或${options.TEAM}名称`
        },
        step2:{
          title : "创建个人账号",
          email : "邮箱地址",
          password : "请输入至少8位字母加数字的组合",
          name : "用户名"
        }
      },
      projectProgress : {
        report : `查看${options.PROJECT}${options.REPORT}`,
        target : {
          completed : "已完成",
          total : "目标"
        },
        taskNumber : {
          header : "概览",
          totalNumber : `未完成${options.TASK}`,
          urgent : `紧急${options.TASK}`,
          overdue : `逾期${options.TASK}`
        },
        projectNotice:{
          header : "公告"
        },
        log:{
          header : "动态"
        }
      },
      myTaskProgress : {
        projectSummary : {
          header : `${options.PROJECT}概览`,
          all : "我参与的",
          opened : "活跃的",
          archive : "已归档"
        },
        taskSummary : {
          header : `我的${options.TASK}概览`,
          assignToMe : "我负责的",
          myOwn : "我创建的"
        },
        activitySummary : {
          header : `我的${options.TASK}动态`,
          more : "查看更多动态",
          emptyTitle : "没有动态",
          emptySubtitle : "暂无与我相关的动态"
        }
      },
      myTimeline : {
        emptyTitle: "没有动态",
        emptySubtitle: "暂无与我相关的动态"
      },
      profilePreference : {
        general : {
          header : "通用",
          systemLanguage : "系统语言"
        }
      },
      personalAccount : {
        avatar : "头像",
        name : "姓名",
        title : "职位",
        email : "邮箱地址",
        phone : "手机号码",
        password : "帐户密码",
        changePassword : "更改密码",
        changePhone : "更改绑定",
        changeEmail : "更改绑定",
        logout : "退出登录",
        notBind : "未绑定",
        updateSuccess: "更新成功",
        error : {
          nameEmpty : "姓名不能为空",
          emailEmpty : "邮箱不能为空",
          emailNotValid : "邮箱格式不正确",
          emailUsed : "邮箱已被绑定，请使用其他邮箱",
          phoneEmpty : "手机不能为空",
          phoneNotValid : "手机格式不正确",
          phoneUsed : "手机已被绑定，请使用其他手机",
          verifyCodeEmpty : "验证码不能为空",
          verifyCodeNotValid : "验证码无效",
          verifyCodeExpired : "验证码过期",
          newPasswordEmpty : "新密码不能为空",
          newPasswordNotValid : "新密码格式不正确",
          newPasswordConfirmEmpty : "确认密码不能为空",
          newPasswordConfirmNotValid : "确认密码格式不正确",
          newPasswordNotConfirm : "两次输入的密码不同",
        },
        placeholder : {
          name : "填写姓名",
          title : "填写职位"
        },
        passwordEditor : {
          header : "更改密码",
          step1 : {
            title : "验证身份"
          },
          step2 : {
            title : "设置新密码",
            inputNewPassword : "输入新密码",
            inputNewPasswordAgain : "确认新密码",
            newPasswordPlaceholder : "长度至少8位",
            newPasswordConfirmPlaceholder : "再次输入新密码"
          }
        },
        emailEditor : {
          header : "更改邮箱",
          step1 : {
            title : "验证身份"
          },
          step2 : {
            title : "设置新邮箱",
            newEmail : "新邮箱地址",
            verifyCode : "验证码",
            getVerifyCode : "获取验证码",
            resendVerifyCode : "重新发送",
            newEmailPlaceholder : "输入新邮箱地址",
            verifyCodePlaceholder : "输入验证码",
            sendRequestCodeSuccess : "我们已向你的邮箱发送了一封含有验证码的邮件，请查收。",
            submit : "提交更改"
          }
        },
        phoneEditor : {
          header : "更改手机",
          step1 : {
            title : "验证身份"
          },
          step2 : {
            title : "设置新手机",
            newPhone : "新手机号码",
            verifyCode : "验证码",
            getVerifyCode : "获取验证码",
            resendVerifyCode : "重新发送",
            newPhonePlaceholder : "输入新手机号码",
            verifyCodePlaceholder : "输入验证码",
            sendRequestCodeSuccess : "我们已向你的手机发送了一条含有验证码的短信，请查收。",
            submit : "提交更改"
          }
        }
      },
      myTemplates: {
        renameTemplateLabel: "重命名模板",
        editTemplateLabel: "编辑模板",
        newTemplateLabel: "新建模板",
        errTemplateNotFound: "模板不存在",
      },
      templateManager : {
        add:{
          cancelBtn:"取消",
          submitBtn:"创建",
          title : "创建我的模版"
        },
        edit:{
          cancelBtn:"取消",
          submitBtn:"确认编辑",
          title : "编辑我的模版"
        },
        emptyTemplate : "模版至少需要填写一项内容"
      },
      completeRegister: {
        title: "完成注册",
        mainTitle: "注册完成，请完善你的信息",
        uploadIcon: "上传头像",
        nameInput: "名称",
        completeBtn: "完成注册",
      },
      dashboard: {
        joinTeam: `加入${options.TEAM}`,
        joinTeamSubtitle: `您当前没有加入任何${options.TEAM}，您可以：`,
        teamCreateTitle: `创建新${options.TEAM}`,
        teamNameInput: `输入${options.TEAM}名称`,
        teamNameTips: `${options.TEAM}名称`,
        teamCreateConfirm: "确认创建",
        teamJoinTitle: `通过以下方式加入已有${options.TEAM}`,
        teamInviteLink: "邀请链接",
        teamInviteLinkTips: `向${options.TEAM}管理员索取激活链接，点击链接激活加入`,
        teamInviteQrcode: "扫二维码",
        teamInviteQrcodeTips: `向${options.TEAM}管理员索取加入二维码，手机扫一扫加入`,
        myTasks: `我的${options.TASK}`,
        mySmallTasks:"我的",
        openDashboard:"展开菜单",
        projectList: `${options.PROJECT}列表`,
        milestoneList:`${options.MILESTONE}列表`,
      },
      filterMain: {
        myTasks: `我的${options.TASK}`,
        emptyTaskText: `没有${options.TASK}`,
        emptyTaskSubText : `暂无与我相关的${options.TASK}`
      },
      forget: {
        errPasswordNotDoubleMatch: "两次输入的密码不同，请确认后重新输入",
        errEmailFormatWrong: "邮箱格式不正确",
        errPhoneFormatWrong: "手机格式不正确",
        forgetTitle: "重置密码",
        forgetMainTitle: "通过以下方式重置密码",
        resetEmail: "邮箱重置",
        resetPhone: "手机重置",
        resetPassword: "重新设置密码",
        getVerifyCode: "获取验证码",
        emailInput: "注册邮箱",
        phoneInput: "注册手机",
        codeInput: "验证码",
        passwordInput: "请输入至少8位字母加数字的组合",
        secondPasswordInput: "请再一次输入密码",
      },
      invite: {
        errInviteCodeWrong: "邀请码不正确",
        errInviteAlready: `你已经加入了一个正式${options.TEAM}，不能再加入其它${options.TEAM}了`,
        errInviteCodeInvalid: "邀请码无效",
        errInviteCodeExpired: "邀请码过期",
        title: "邀请成员",
        mainTitle: "邀请注册",
        knowMore: "了解更多",
        inviteMessage: "邀请函",
        currentLogin: "当前登录的账户是",
        switchAccount: "切换账号",
        inviteYou: "邀请你加入",
        acceptInvite: "接受邀请",
        leaveInvite: "暂不接受",
        proceedInvite: "处理请求",
        backToHome: "返回ONES.AI",
        inviteRegister: "邀请注册",
        nameInput: "填写名称",
        passwordInput: "设置密码",
        enterTeam: `进入${options.TEAM}`,
      },
      teamInvite: {
        joinTitle: `加入%{teamName}${options.TEAM}`,
        registerName: "名称",
        passwordInput: "设置密码",
      },
      teamInviteSuccessful: {
        successTitle: `加入${options.TEAM}成功`,
        successMessage: "请下载ONES.AI手机客户端，立即体验！",
        successSubText: "或在电脑上访问 https://ones.ai/do",
        toDownload: "前往下载手机客户端",
      },
      login: {
        errContactWrong: "请输入正确有效的email或手机",
        errPasswordWrong: "请输入有效的密码",
        errAuthWrong: "账户或密码错误",
        errUserExpired: `您当前所在的${options.TEAM}已过期，详情请联系${options.TEAM}管理员`,
        errUserNotInTeam: `该账户已失效，请联系${options.TEAM}管理员`,
        errOwnerTeamExpired: `当前${options.TEAM}已过期，请联系${options.TEAM}专属客户顾问`,
        title: "登录",
        contactInput: "邮箱/手机号",
        passwordInput: "登录密码",
        loginSubmit: "登录",
        rememberMe: "记住密码",
        notRegistered: "还没有账号？",
        forgotPassword: "忘记密码",
        createTeam : `创建${options.TEAM}`,
        loginFailed: "登录失败",
        teamEffectiveEndDate: "有效期至：",
        teamExpiredDays: "（已过期%{days}天）",
      },
      profilePersonal: {
        errOldPasswordWrong: "旧密码错误",
        errPasswordWrong: "密码填写错误",
        errInvalidPhone: "请填写有效的手机号",
        errInvalidEmail: "请填写有效的email",
        errBindFailedPasswordWrong: "绑定失败，密码填写错误",
        errBindFailedPhoneWrong: "绑定失败，请确认手机是否正确",
        errBindFailedEmailWrong: "绑定失败，请确认邮件是否正确",
        errVerifyCodeWrong: "请填写正确的验证码",
        errCodeInvalid: "验证码不正确",
        errCodeExpired: "验证码过期",

        switchLang: "更改语言",
        resetPassword: "修改密码",
        oldPasswordInput: "输入旧密码",
        newPasswordInput: "输入新密码",

        switchPhone: "更改手机绑定",
        bindPhone: "绑定手机号",
        passwordInput: "输入密码",
        newPhoneInput: "输入新手机号",
        getVerifyCode: "获取验证码",
        myNewPhone: "我的新手机",
        phoneCodeInput: "输入手机验证码",
        resetCode: "重发验证码",
        resetCodeCountDown: "%{seconds}秒",

        switchEmail: "更改邮箱绑定",
        bindEmail: "绑定邮箱",
        newEmailInput: "输入新邮箱",
        myNewEmail: "我的新邮箱",
        emailCodeInput: "输入邮箱验证码",

        title: "个人",
        personalProfile: "个人资料",
        updateNick: "修改昵称",
        setName: "填写称呼",
        setPersonTitle: "填写职位",
        updatePersonTitle: "修改职位",
        changeAvatar: "更换头像",
        accountPassword: "账号密码",
        loginPassword: "登录密码",
        updateEmail: "邮箱账号",
        updatePassword: "更改密码",
        updatePhone: "手机账号",
        changeBinding: "更改绑定",
        setPreferences: "偏好设置",
        systemLang: "系统语言",
        logout: "退出登录",
      },
      profileTeam: {
        errNoTeamAccess: `没有访问此${options.TEAM}的权限`,
        errNoTeamLink: `没有${options.TEAM}链接`,
        errAccountExit: `帐号已有${options.TEAM}，无法邀请`,
        errNotOwnerInvite: `不是${options.TEAM}管理员无法邀请成员`,
        errOwnerDeleteTeamError: `您当前仍为${options.TEAM}或部分${options.PROJECT}的管理员，请先将该管理权限转交后再进行退出${options.TEAM}操作。`,
        errPersonalTeamError: `个人${options.TEAM}不能退出`,
        errTeamIsFull: "当前可以用账号数为0，你可以联系专属客户顾问升级账号数",
        deleteMemberConfirm: `确认要将该成员从${options.TEAM}中移除吗？`,
        sendSuccessful: "发送成功",
        copyLink: "复制链接",
        copySuccessful: "复制成功",
        copyFailed: "复制失败",
        inviteMember: "邀请新成员",
        emailInvite: "邮箱邀请",
        linkInvite: "链接/二维码邀请",
        scanQrcode: `让新成员扫描二维码加入${options.TEAM}`,
        closeInvite: "关闭邀请",
        openInvite: "开启邀请",
        inviteTips1: "开启邀请后可以通过分享",
        inviteTips2: `邀请新成员加入${options.TEAM}`,
        title: `${options.TEAM}`,
        transferTeam: `${options.TEAM}转让`,
        quitTeam: `退出${options.TEAM}`,
        deleteTeam: `解散${options.TEAM}`,
        transferListHeader: `将${options.TEAM}转让给`,
        transferConfirmMsg: `确定将您在本${options.TEAM}的管理权转交给：`,
        quitTeamConfirmMsg: `确认要退出${options.TEAM}吗？`,
        deleteTeamConfirmMsg: `请输入${options.TEAM}名称以确认解散本${options.TEAM}，解散成功后不可撤销`,
        deleteTeamPlaceholder: `输入本${options.TEAM}名称`,
        deleteMemberLabel: "移除成员",
        memberCountUnit: "%{count}人",
        inviteBtn: "邀请",
        inviteEmailPlaceholder: "输入邮箱邀请新成员",
        teamInvite: {
          errInviteCodeNotExist: "邀请记录不存在",
          errInviteCodeStatusInvalid: "邀请状态有误或已过期",
          status: {
            unknown: '未知',
            unused: '未确认',
            completed: '已加入',
            revoked: '已失效',
            expired: '已过期',
          }
        }
      },
      profileSettings: {
        title: "设置",
        menuPersonal: "个人",
        menuAccount: "账号密码",
        menuNotification: "通知设置",
        menuPreferences: "偏好设置",
        menuTemplate: "模板管理",
        menuTeam: `${options.TEAM}`,
        menuTeamInfo: `${options.TEAM}信息`,
        menuTeamMember: `${options.TEAM}成员`,
        menuTeamPayment: "付费信息",
        menuProject: `${options.PROJECT}管理`,
        menuRoleManager : "权限管理",
        menuDepartment:"组织架构",
        menuPluginSetting:"系统插件"
      },
      profilePluginSetting:{
        list:{
          title : "系统插件",
          opened : "已启用",
          closed : "已停用"
        },
        detail:{
          title : "插件配置",
        },
        "uyghuytr" : {
          name : "工时统计",
          summary : `工时统计插件允许在${options.PROJECT}模板中开启针对${options.TASK}的工时登记，并提供了详细的多维度${options.TEAM}${options.REPORT}`,
          helpTips : `开启工时统计插件后请在需要开启的${options.PROJECT}模板中启用工时模块`
        },
        "87gytrfy":{
          name:"代码关联",
          summary:"代码关联相关的描述"
        },
        "Wag12aBt":{
          name:"甘特图",
          summary:`甘特图插件支持在${options.MILESTONE}之上显示甘特图模块，支持将${options.TASK}转化${options.TASK}甘特图${options.TASK}`,
          helpTips : `开启甘特图插件后请先在需要开启的${options.MILESTONE}中启用甘特图模块，然后将${options.TASK}加入甘特图中`
        }
      },
      profileTeamInfo: {
        errTeamNameEmpty: `${options.TEAM}名称不能为空`,
        updateTeamNameSuccess: `${options.TEAM}名称修改成功`,
        title: "名称与标识",
        labelTeamName: `${options.TEAM}名称`,
        placeholderTeamName: `${options.TEAM}名称`,
        labelTeamLogo: `${options.TEAM}图标`,
        labelTeamLogoTips: `* 请上传尺寸为580*80带透明度的${options.TEAM}图标`,
      },
      profileTeamPayment: {
        header: "付费信息",
        teamStatusLabel: "账户状态",
        expiryLabel: "有效期至",
        paymentCountLabel: "付费账号",
        paymentCountTooltipMsg: `注：已使用账号数包含已加入${options.TEAM}的成员总数和邀请中未确认的成员总数`,
        clientSupportLabel: "客户顾问",
        teamStatus: {
          trial: `试用${options.TEAM}`,
          senior: `高级付费${options.TEAM}`,
          expired: "已过期",
        },
        expiryLeftDays: "剩余 %{days} 天",
        totalCount: "%{total} 个",
        memberCountLeft: "剩余 %{leftCount} 个",
      },
      profileDepartment:{
        department:"组织架构",
        add:"添加部门",
        addDepartment:"添加新部门",
        addChildDepartment:"在%{operatName}下添加子部门",
        addChild:"添加子部门",
        rename:"重命名",
        renameDepartment:"部门名称重命名",
        renameConfirm:"确认修改",
        delete:"删除",
        deleteDepartment:"移除部门",
        deleteHint:"是否确认移除部门 %{departmentName}，移除部门时不会将成员移除，如果该部门下有子部门，则子部门会被同时移除。",
        deleteConfirm:"确认删除",
        cancel:"取消",
        ok:"确定",
        hint:"新建和编辑部门可以通过点击部门右侧菜单完成，部门的移动和排序可以通过拖拽部门卡片完成。",
        departmentNameMaxHint:"部门名字长度不得大于6(英文12个字符长度)",
        departmentNameNullHint:"部门名不得为空",
        nullMemberTitle:"没有成员",
        nullmember:"当前部门下暂无成员",
        errOutOfDate : "部门数据已失效，请刷新界面后重试",
        refreshTree : "刷新"
      },
      profileTeamMember: {
        title: `${options.TEAM}成员`,
        allRoles : "所有角色",
        roleList:{
          header:"更改角色为...",
          setRole : "设为该角色"
        },
        departmentList:{
          header:"把成员移动至...",
          setDepartment:"移到此部门",
        },
        inviteListTitle: "邀请记录 (%{count})",
        inviteBtn: "发送邀请",
        inviteNewMember:"邀请新成员",
        moveToDepartment : "移动到部门",
        changeRole:"设置角色为",
        deleteMemberLabel: "移除成员",
        memberDetailLabel: "成员详情",
        tabMember: `${options.TEAM}成员(%{memberCount})`,
        tabInvited: "待处理(%{invitedCount})",
        inviteExpired: "已失效",
        invitePending: "未确认",
        inviteAgain: "重新邀请",
        cancelInvite: "撤回邀请",
        deleteConfirmMsg: `您当前正在执行移除成员 %{name}（%{contact}）的操作，移除成功后，该成员将不再是本${options.TEAM}成员，其在本${options.TEAM}产生的所有数据保留，该成员负责的未完成${options.TASK}将会自动转交给新的${options.PROJECT}负责人。`,
        deleteTransferMsg: `移除成员失败，请先将以下所有 %{name}（%{contact}）负责的多人${options.PROJECT}或${options.MILESTONE}的管理权转交给新的${options.PROJECT}负责人后再进行确认移除操作`,
        errNoTeamAccess: `没有访问此${options.TEAM}的权限`,
        errCannotExitWithoutTeam: `没有可以退出的${options.TEAM}`,
        deleteSuccessful: "已移除成员%{name}（%{contact})",
        currentOwner: "现负责人",
        newOwner: "新负责人",
        selectNewOwner: "选择新负责人",
        projectTranserTo: `把${options.PROJECT}转让给`,
        searchProjectMember: `搜索${options.PROJECT}成员`,
        confirmDeleteBtn: "确认删除",
        lastLoginTime: "最后登录时间：%{time}",
        updateRoleSuccess: '修改用户角色成功',
        updateDepartmentSuccess : "修改用户部门成功",
        errRoleNotFound: "没有找到角色记录",
        errDepartmentNotFound : "没有找到部门记录",
        errTeamRootCannotChange: `${options.TEAM}创建者不可以被修改`,
        errProjectMilestoneNotFound: `${options.PROJECT}或${options.MILESTONE}不存在`,
        inviteTime: "邀请时间",
        action: "操作",
        resendInvite: "重新邀请",
        resendInviteConfirmMsg: "此操作会将重新发送新的邀请链接至该成员邮箱，是否确定继续？",
        cancelInviteConfirmMsg: "操作会使该邮箱的所有邀请链接失效，是否确定继续？",
        searchPlaceholder: "输入昵称、邮箱查找成员",
        errUserNotFound: "找不到和您查询的“%{key}”相符的成员。",
        reSearch: "请检查关键字重新搜索",
      },
      projectChat: {
        inputPlaceholder: `${options.PROJECT}会话`,
      },
      projectMain: {
        emptyText: `没有${options.TASK}`,
        emptySubText : `当前${options.PROJECT}下暂无${options.TASK}`,
        addSection: "添加分类",
        disabledAddSection : "添加分类 (当前分类不支持)",
        viewMode: `${options.PROJECT}视图`,
        toggleRightPanel:"显示/隐藏右侧栏",
        saveAs:"另存为我的模版",
        saveAsTemplate : {
          success : "保存模版成功"
        },
        errorPinFail : `设置${options.PROJECT}置顶失败`,
        errorUnpinFail : `取消${options.PROJECT}置顶失败`
      },
      projectList: {
        title: `所有${options.PROJECT}`,
        add: `添加${options.PROJECT}`,
        emptyTitle: `没有${options.PROJECT}`,
        emptySubTitle: `暂无${options.PROJECT}数据，可以在此处查看${options.PROJECT}列表`,
        statusOpen: "进行中",
        statusArchived: "已归档",
        fieldName: `${options.PROJECT}名称`,
        fieldOwner: `${options.PROJECT}负责人`,
        fieldMemberCount: "成员数",
        fieldCompletedCount: "已完成",
        fieldTotalCount: "总数",
      },
      projectManager: {
        templateEditor:{
          title : `编辑${options.PROJECT}模版`,
          backBtn: `返回${options.PROJECT}`,
          submitBtn:"完成编辑",
        },
        oldOwner:"现负责人: ",
        newOwner:"新负责人: ",
        chooseNewOwner:"选择新负责人",
        editTemplate:"编辑模版",
        errProjectNameNotMatch: '${options.PROJECT}名称不正确',
        errProjectNameEmpty: `${options.PROJECT}名称不能为空`,
        errProjectNameExceedLength: `${options.PROJECT}名称过长`,
        exportCSV: `导出${options.PROJECT}`,
        exportCSVConfirmMsg: `系统会将当前${options.PROJECT}下的所有${options.TASK}以CSV文件的形式下载导出`,
        canNotTransferProject: `当前${options.PROJECT}只有一个${options.PROJECT}成员，无法直接转让管理权`,
        transferLabel: "管理权转让",
        quitProjectLabel: `退出${options.PROJECT}`,
        deleteProjectLabel: `删除${options.PROJECT}`,
        setArchive: `归档${options.PROJECT}`,
        setArchived: "撤销归档",
        transferListHeader: `将${options.PROJECT}管理权转让给`,
        transferConfirmMsg: `确定将您在本${options.PROJECT}的管理权转交给 %{userName} 吗？`,
        quitWarningMsg: `请先将本${options.PROJECT}管理权限转让后再进行退出${options.PROJECT}操作`,
        quitConfirmMsg: `确定要退出本${options.PROJECT}吗？退出后您将无法查看本${options.PROJECT}`,
        quitConfirmToDeleteMsg: `当前${options.PROJECT}只有您一个成员，无法退出${options.PROJECT}，您可以点击删除${options.PROJECT}按钮完成删除并退出${options.PROJECT}`,
        setArchiveMsg: `你确定要归档本${options.PROJECT}吗？`,
        setArchiveMsged: `你确定要撤销归档本${options.PROJECT}吗？`,
        deleteConfirmBtnLabel: "删除",
        deleteProjectConfirmMsg: `勾选下方${options.PROJECT}名称并点击确认删除，将会删除该${options.PROJECT}所有${options.TASK}/文件/会话，此操作不可恢复。`,
        deleteProjectPlaceholder: `输入本${options.PROJECT}名称`,
        editProject: `${options.PROJECT}设置`,
        addProject: `创建${options.PROJECT}`,
        selectedMember1: "已选择",
        selectedMember2: `位${options.PROJECT}成员`,
        createConfirmBtn: "确认创建",
        projectTitlePlaceholder: `输入${options.PROJECT}名称`,
        searchMemberPlaceholder: `输入昵称或邮箱查找${options.PROJECT}成员`,
        selectMemberAllLabel: "选择全部",
        projectDescPlaceholder: `输入${options.PROJECT}公告`,
        projectDeadlinePlaceholder: `设置${options.PROJECT}截止日期`,
        saveTemplateLabel: `保存${options.PROJECT}模板`,
      },
      projectMembers: {
        addMemberSearchPlaceholder: "输入昵称、邮箱查找成员",
        addMemberBtn: `添加${options.PROJECT}成员`,
        selectMemberLabel: `选择${options.PROJECT}成员`,
        addMemberAllLabel: "全选",
        removeMemberAllLabel:"取消全选"
      },
      projectFiles: {
        uploadLabel: "上传文件",
      },
      register: {
        errVerifyCodeWrong: "请填写正确的验证码",
        errUserAgreementConfirm: "请勾选用户协议",
        errInvalidPhone: "请填写有效的手机号",
        errInvalidEmail: "请填写有效的email",
        mobileNo: "手机号码",
        getVerifyCode: "发送验证码",
        getVerifyCodeTimeout: "%{time}秒后重发",
        verifyCode: "验证码",
        passwordInput: "请输入8位中英文数字组成的密码",
        loginPassword: "登录密码",
        agreement: "我已阅读并同意《ONES.AI服务条款》",
        registerWithEmail: "用邮箱注册",
        registerWithPhone: "用手机号注册",
        loginEmail: "登录邮箱",
        checkVerifyCodeEmail: "请登录以下邮箱查看注册验证码",
        verifyCodeInput: "请输入6位验证码",
        noVerifyEmail: "没收到验证码邮件？",
        resendVerifyEmail: "重新发送",
        resendVerifyEmailTimeout: "%{time}秒后可重新发送",
        backChangeEmail: "返回更换邮箱",

        verifyCodeTitle: "请输入验证码",
        registerTitle: "注册",
        registerPhoneTitle: "手机注册",
        registerEmailTitle: "邮箱注册",
        alreadyHasAccount: "已有账号？",
        loginBtn: "登录",
      },
      searchView: {
        allResult:"所有结果",
        projectResult: `${options.PROJECT}`,
        taskResult: `${options.TASK}`,
        fileResult:"文件",
        reSearch:"请检查关键字重新搜索",
        more:"更多",
        subtask: `子${options.TASK}`,
        number: `${options.TASK}ID`,
        content:"文档内容",
        search:"搜索",
        nullProject: `您可能无法查看此${options.PROJECT}`,
        noResult:"没有相关结果",
        desc:"描述",
        tags:"标签",
        searchPlaceholder: `搜索${options.PROJECT}、${options.TASK}、文件...`,
        extendProject: `所属${options.PROJECT}：`,
        incomplate: `未完成${options.TASK}`,
        noKeyword:'找不到和您查询的"%{key}"相符的内容。'
      },
      taskDetail: {
        taskTag:"标签",
        taskFile:"文件",
        taskMessage:"动态",
        addManhour:"登记工时",
        addGantt:"加入甘特图",
        deleteGantt:"移出甘特图",
        subtask : {
          add : `添加子${options.TASK}...`,
          title : `子${options.TASK}`
        },
        milestone : {
          add : `添加${options.MILESTONE}...`,
          title : `${options.MILESTONE}`,
          changeFail : `更改${options.TASK}${options.MILESTONE}失败`,
          deleteFail : `移除${options.TASK}${options.MILESTONE}失败`,
        },
        manhour:{
          title:"工时",
          all:"工时合计: ",
          addManhourTitle: `登记${options.TASK}工时`,
          deleteManhourTitle:"确认删除工时记录",
          deleteConfirm:"确认删除",
          estimated:"预估工时: ",
          openAll:"查看所有(%{num})",
          spend:"耗时: %{num}小时",
          hour:"小时",
          start:"开始: ",
          confirm:{
            startTime:"开始时间",
            startTimePlaceholder:"请输入开始时间",
            spendTime:"消耗时间",
            spendTimePlaceholder:"请输入消耗时间",
            desc:"备注",
            remarkPlaceholder:"请输入工作情况",
            startTimeError:"开始时间不能为空",
            spendTimeError:"消耗时间不能为空",
            spendTimeRangeError:"请输入合法的工时数值，范围0.01-9999",
            spendTimePointError :"消耗时间最多精确到小数点后两位"
          },
          setEstimatedManhour : {
            title : "设置预估工时",
            placeholder : "请输入预估时间",
            unit : "小时",
            error : {
              601 : `修改失败，${options.TASK}不存在`,
              810 : `修改失败，你不是该${options.PROJECT}的成员`,
              801 : "请输入合法的工时数值，范围0.01-9999",
              point :"工时最多精确到小数点后两位"
            }
          }
        },
        gantt:{
          title:"甘特图",
          startTime:"开始时间",
          startTimePlaceholder:"设置开始时间",
          startTimeNotNull:"开始时间不得为空",
          endTime:"结束时间",
          endTimePlaceholder:"设置结束时间",
          endTimeNotNull:"结束时间不得为空",
          startToEndRangeError:"开始时间不得大于结束时间",
          guessTime:"预估工期",
          guessTimePlaceholder:"设置预估工期",
          guessTimeUnit:" 天",
          progress: `${options.TASK}进度`,
          progressUnit:"%",
          progressError: `${options.TASK}进度只能为整数数字`,
          progressRangeError: `${options.TASK}进度只能为0-100的整数`,
          frontTask: `前置${options.TASK}`,
          noFrontTask: `未设置前置${options.TASK}`,
          addFrontTaskTitle: `添加前置${options.TASK}`,
          deleteConfirm: `确认移除前置${options.TASK}`,
          deleteGanttTaskGanttConfirm: `当前${options.TASK}以及子${options.TASK}会变成未计划${options.TASK}，如果当前${options.TASK}是子${options.TASK}，则同时会自动将该子${options.TASK}变更为${options.TASK}`,
          addGanttTaskGanttConfirm: `当前${options.TASK}以及子${options.TASK}会变成已计划${options.TASK}，如果当前${options.TASK}是子${options.TASK}，则同时会自动将该子${options.TASK}变更为${options.TASK}`,
          frontTaskTypeTitle:"类型",
          searchPlaceholder: `搜索已计划${options.TASK}标题或${options.TASK}ID`,
          noSearchResult: `没有相关的${options.TASK}`,
          frontTasktype:{
            FS:"完成 → 开始 (FS)",
            SS:"开始 → 开始 (SS)",
            FF:"完成 → 完成 (FF)",
            SF:"开始 → 完成 (SF)",
            F:"完成",
            S:"开始"
          }
        },
        relatedtask : {
          readAble:"无权限",
          complate:"已完成",

          placeholder: `搜索${options.TASK}标题或${options.TASK}ID...`,
          add : `添加关联${options.TASK}`,
          title : `关联${options.TASK}`,
          addSuccess:"添加关联成功",
          addError:{
            selfAdd:"不能关联自身",
            notFind: `找不到对应的${options.TASK}`,
            notAble: `所关联${options.TASK}不属于${options.PROJECT}或者是子${options.TASK}`,
            relatedTask: `该${options.TASK}已被关联`,
          },
          deleteError:{

          },
          emptyResult: `没有匹配的${options.TASK}`
        },
        errMoveTaskToProjectNoRight: `你没有把此${options.TASK}移动到该${options.PROJECT}的权限。`,
        errNoBoardSelect: "请选择要移动到的分类",
        moveTaskSelectProject: `选择${options.PROJECT}`,
        moveTaskSelectBoard: "选择分类",
        assignHeaderLabel: `把${options.TASK}指派给...`,
        assignSearchPlaceholder: "搜索成员",
        taskTitlePlaceholder: "标题",
        taskDescPlaceholder: `请输入${options.TASK}描述`,
        tagsPlaceholder: `${options.TASK}标签`,
        showMoreFiles: "查看所有 (%{fileCount})",
        hideMoreFiles: "收起文件",
        taskDesc: `${options.TASK}描述`,
        menuDeadline: '截止时间',
        menuAddTag: '添加标签',
        taskNumber: `${options.TASK}ID`,
        uploadLabel: "上传附件",
        taskDetailLabel: `${options.TASK}详情`,
        taskDeleteConfirmMsg: `确认删除${options.TASK}？`,
        subTaskDeleteConfirmMsg: `确认删除子${options.TASK}？`,
        ganttAddConfirmMsg: `确认当前${options.TASK}加入甘特图？`,
        ganttDeleteConfirmMsg: `确认将当前${options.TASK}移出甘特图？`,
        taskMoveProjectLabel: `把${options.TASK}移动到`,
        noProjectLabel: `无所属${options.PROJECT}`,
        taskChatInputPlaceholder: `${options.TASK}讨论`,
        fileEmptyText: `无${options.TASK}文件`,
        deadline: "截止日期",
        assignee: "负责人",
        priority: `${options.PRIORITY}`,
        taskTarget: `${options.TASK}目标`,
        projectTarget : `${options.PROJECT}目标`,
        attributes: "属性",
        moveTask: `移动${options.TASK}`,
        addRelatedTask: `关联${options.TASK}`,
        deleteTask: `删除${options.TASK}`,
        addSubTask: `添加子${options.TASK}`,
        deleteSubTask : `删除子${options.TASK}`,
        changeAssignee: "更改负责人",
        changeDeadline: "更改截止日期",
        changePriority: `更改${options.PRIORITY}`,
        backToProject: `返回${options.PROJECT}`,
        backToTask: `返回${options.TASK} %{taskName}`,
        moreBtnTips: "更多",
        subTaskMoreBtnTips : `删除${options.TASK}`
      },
    },
  }
}
