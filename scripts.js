// 主题切换功能
document.addEventListener("DOMContentLoaded", function () {
  // 初始化主题
  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-bs-theme", theme);

    // 更新主题图标
    const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = themeToggle.querySelector(
      '[data-theme-icon-active="bi-sun-fill"]'
    );
    const moonIcon = themeToggle.querySelector(
      '[data-theme-icon="bi-moon-fill"]'
    );

    if (theme === "dark") {
      sunIcon.classList.remove("theme-icon-active");
      moonIcon.classList.add("theme-icon-active");
    } else {
      moonIcon.classList.remove("theme-icon-active");
      sunIcon.classList.add("theme-icon-active");
    }
  };

  // 设置初始主题
  setTheme(getPreferredTheme());

  // 监听主题切换按钮点击
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setStoredTheme(newTheme);
  });

  // 监听系统主题变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (!storedTheme) {
        setTheme(getPreferredTheme());
      }
    });

  // 滚动动画
  const animateSections = () => {
    const sections = document.querySelectorAll(".section-with-animation");

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("animate");

        // 为子元素添加动画
        const animateElements = section.querySelectorAll(".card");
        animateElements.forEach((element, index) => {
          element.classList.add("animate__animated");
          element.classList.add("animate__fadeInUp");
          element.style.animationDelay = `${index * 0.1}s`;
        });
      }
    });
  };

  // 初始化滚动动画
  animateSections();
  window.addEventListener("scroll", animateSections);

  // 导航链接平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });

        // 更新活动导航链接
        document.querySelectorAll(".nav-link").forEach((navLink) => {
          navLink.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // 监听滚动以更新活动导航链接
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-link").forEach((navLink) => {
          navLink.classList.remove("active");
          if (navLink.getAttribute("href") === `#${sectionId}`) {
            navLink.classList.add("active");
          }
        });
      }
    });
  });



  // 初始化图表
  if (typeof Chart !== "undefined") {
    // 薪资分析图表
    const salaryCategoryCtx = document.getElementById("salaryCategoryChart");
    if (salaryCategoryCtx) {
      new Chart(salaryCategoryCtx, {
        type: "bar",
        data: {
          labels: [
            "互联网/IT",
            "金融/银行",
            "电子商务",
            "教育培训",
            "医疗健康",
            "文化传媒",
          ],
          datasets: [
            {
              label: "平均月薪（元）",
              data: [5200, 4800, 4500, 4000, 4300, 3800],
              backgroundColor: [
                "rgba(54, 162, 235, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // 行业分布图表
    const industryDistributionCtx = document.getElementById(
      "industryDistributionChart"
    );
    if (industryDistributionCtx) {
      new Chart(industryDistributionCtx, {
        type: "doughnut",
        data: {
          labels: [
            "互联网/IT",
            "金融/银行",
            "电子商务",
            "教育培训",
            "医疗健康",
            "其他",
          ],
          datasets: [
            {
              data: [32, 18, 15, 12, 8, 15],
              backgroundColor: [
                "rgba(54, 162, 235, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      });
    }

    // 地区分布图表
    const regionDistributionCtx = document.getElementById(
      "regionDistributionChart"
    );
    if (regionDistributionCtx) {
      new Chart(regionDistributionCtx, {
        type: "pie",
        data: {
          labels: ["华东地区", "华北地区", "华南地区", "西南地区", "其他地区"],
          datasets: [
            {
              data: [35, 25, 20, 12, 8],
              backgroundColor: [
                "rgba(54, 162, 235, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(153, 102, 255, 0.7)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    // 城市薪资图表
    const citySalaryCtx = document.getElementById("citySalaryChart");
    if (citySalaryCtx) {
      new Chart(citySalaryCtx, {
        type: "bar",
        data: {
          labels: ["北京", "上海", "深圳", "杭州", "成都", "广州"],
          datasets: [
            {
              label: "平均月薪（元）",
              data: [4800, 4600, 4500, 4200, 3800, 4100],
              backgroundColor: "rgba(75, 192, 192, 0.7)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  // 为统计卡片添加动画效果
  const statCards = document.querySelectorAll(".stat-card");

  statCards.forEach((card) => {
    // 获取图标元素
    const icon = card.querySelector(".stat-icon");
    if (icon) {
      // 添加CSS动画
      card.addEventListener("mouseenter", function () {
        // 使用心跳动画
        icon.style.animation = "pulse 1s ease-in-out";
        icon.style.animationIterationCount = "1";
      });

      card.addEventListener("mouseleave", function () {
        // 停止动画
        icon.style.animation = "";
        icon.style.transform = "scale(1)";
      });

      // 添加动画结束事件监听器
      icon.addEventListener("animationend", function () {
        if (!card.matches(":hover")) {
          icon.style.animation = "";
          icon.style.transform = "scale(1)";
        }
      });
    }
  });

  // 为导航链接添加点击波纹效果
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.classList.add("nav-link-ripple");
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      ripple.classList.add("active");

      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
});

(function () {
  const myChart1 = echarts.init(document.getElementById("myChart1"));
  const myChart2 = echarts.init(document.getElementById("myChart2"));
  // const myChart3 = echarts.init(document.getElementById('myChart3'));
  // const myChart4 = echarts.init(document.getElementById('myChart4'));

  const option1 = {
    title: [
      // {
      //     text: '小红书帖子中关于"实习"内容的公告占比',
      //     left: 'center',
      //     textStyle: {
      //         fontSize: '24px',
      //     },
      // },
      // {
      //   text: "单位: 个",
      //   textStyle: {
      //     color: "#888",
      //     fontSize: "14px",
      //     fontWeight: "normal",
      //   },
      //   right: "right",
      //   top: "10%",
      // },
      {
       // text: "数据来源: 在小红书、咸鱼、淘宝平台采集2166条有效数据\n并通过python进行数据爬取、在excel中进行数据整理与清洗",
        //bottom: "10%",
        //left: "left",
       // textStyle: {
         // color: "#888",
         // fontSize: "14px",
         // fontWeight: "normal",
         // lineHeight:"1.5",
        //},
        // backgroundColor: '#ccc',
      },
    ],
    legend: {
      orient: "vertical",
      top: "10%",
      left: "left",
      textStyle: {
        color: "#888",
      },
      selectedMode: false,
      show: false,
    },
    tooltip: {},
    // backgroundColor: '#ffffff',
    series: [
      {
        type: "pie",
        data: [
          {
            value: 158,
            name: "正常交流贴",
          },
          {
            value: 286,
            name: "明广与暗广",
          },
          {
            value: 106,
            name: "引流贴",
          },
        ],
        radius: ["50%", "80%"],
        color: ["#FFF2B5", "#FFC277", "#FE9B24"],
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          fontSize: 16,
          formatter: "{b}",
          position: "inside",
          rotate: "tangential",
        },
        labelLayout: {
          verticalAlign: "middle",
        },
      },
      {
        type: "pie",
        data: [
          {
            value: 158,
            name: "非广告",
          },
          {
            value: 392,
            name: "广告",
          },
        ],
        radius: ["15%", "45%"],
        color: ["#FEEA8B", "#FEAE4F"],
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          fontSize: 16,
          formatter: "{b} {d}%",
          position: "inside",
          rotate: "tangential",
          lineHeight: 28,
        },
        labelLayout: {
          verticalAlign: "middle",
        },
      },
    ],
  };

  const option2 = {
    title: [
      {
        text: "单位：个",
        textStyle: {
          color: "#888",
          fontSize: "14px",
          fontWeight: "normal",
          lineHeight: 20,
        },
      },
      {
        text: "数据来源：在咸鱼、淘宝平台采集1722条有效数据，并通过excel进行数据整理与清洗。 \n超大城市：北京、上海、广州、深圳、天津、成都\n特大城市：武汉、东莞、西安、杭州、佛山、南京、沈阳、青岛、济南、长沙、哈尔滨、郑州、昆明、大连\n大城市：南宁、石家庄、厦门、太原、苏州、贵阳、合肥、乌鲁木齐、宁波、无锡、福州、长春、南昌、常州\n中小城市：其他城市",
        bottom: "bottom",
        textStyle: {
          color: "#888",
          fontSize: "12px",
          fontWeight: "normal",
          lineHeight: 20,
          overflow: "breakAll",
        },
      },
    ],
    xAxis: {
      type: "category",
      data: ["超大城市", "特大城市", "大城市", "中小城市"],
    },
    yAxis: {
      type: "value",
      max: 900,
      interval: 100,
      splitLine: {
        show: false
      }
    },
    grid: {
      bottom: "30%",
    },
    series: [
      {
        data: [
          {
            value: 816,
            itemStyle: {
              color: "#ED6D47",
            },
          },
          {
            value: 367,
            itemStyle: {
              color: "#FFAE4D",
            },
          },
          {
            value: 227,
            itemStyle: {
              color: "#FFEA8B",
            },
          },
          {
            value: 276,
            itemStyle: {
              color: "#F5AD8F",
            },
          },
        ],
        type: "bar",
        label: {
          show: false,
          position: "inside",
          formatter: "{c}",
        },
      },
    ],
    tooltip: {},
  };

  const option3 = {
    title: [
      {
        text: "单位：%",
        textStyle: {
          color: "#888",
          fontSize: "14px",
          fontWeight: "normal",
          lineHeight: 20,
        },
      },
      {
        text: "数据来源：本组所收集的数据库",
        bottom: "8%",
        textStyle: {
          color: "#888",
          fontSize: "14px",
          fontWeight: "normal",
          lineHeight: 20,
        },
      },
    ],
    legend: {
      left: "left",
      top: "8%",
      textStyle: {
        color: "#888",
      },
      icon: "circle",
    },
    tooltip: {},
    series: [
      {
        type: "pie",
        data: [
          { name: "私企", value: 81 },
          { name: "国际组织", value: 4 },
          { name: "事业单位", value: 5 },
          { name: "外企", value: 50 },
          { name: "国企", value: 35 },
        ],
        padAngle: 1,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          fontSize: 14,
          formatter: "{b} {d}%",
          position: "inside",
          rotate: "tangential",
        },
        color: ["#F2A93B", "#FFE67C", "#F5CC44", "#ED7C2F", "#F4914E"],
        radius: ["0%", "65%"],
      },
    ],
  };

  myChart1.setOption(option1);
  myChart2.setOption(option2);
  // myChart3.setOption(option3);

  window.addEventListener("resize", function () {
    myChart1.resize();
    myChart2.resize();
    // myChart3.resize();
  });
})();

(function () {
  const chartDom = document.getElementById("myChart4");
  const myChart = echarts.init(chartDom);

  const companies = [
    { id: 0, name: "成都来者教育科技\n有限公司（DBC职梦）", category: 0 },
    { id: 1, name: "成都萌想科技\n有限责任公司（实习僧）", category: 1 },
    {
      id: 2,
      name: "互联派教育科技（大连）\n有限公司（互联派）",
      category: 2,
    },
    { id: 3, name: "北京爱思益咨询\n有限公司（爱思益）", category: 3 },
    { id: 4, name: "蔓藤教育咨询\n（北京）有限公司", category: 4 },
    { id: 5, name: "北京淘友天下科技发展\n有限公司", category: 5 },
    { id: 6, name: "成都先胜信息科技\n有限公司（offer先生）", category: 6 },
    {
      id: 7,
      name: "职优你（上海）教育科技\n有限公司（unicareer）",
      category: 7,
    },
    { id: 8, name: "北京集思未来科技\n有限公司", category: 8 },
    { id: 9, name: "圈里网络科技（广州）\n有限公司（懂职帝）", category: 9 },
    { id: 10, name: "远方有录科技（北京）\n股份有限公司", category: 10 },
    { id: 11, name: "奥弗（深圳）科技有限公司", category: 11 },
    {
      id: 12,
      name: "海马中际教育科技集团\n有限公司（海马职加）",
      category: 12,
    },
    { id: 13, name: "上海瀚泊科技集团有限公司\n（翰泊职培）", category: 13 },
    { id: 14, name: "北京旷智信息科技有限公司\n（途鸽求职）", category: 14 },
    { id: 15, name: "南京美之桥教育咨询\n有限公司", category: 15 },
  ];

  // 连接关系
  const _links = [
    [0, 2],
    [0, 14],
    [0, 12],
    [0, 13],
    [0, 6],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 15],
    [0, 7],
    [1, 2],
    [1, 14],
    [1, 12],
    [1, 13],
    [1, 6],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 15],
    [1, 7],
    [2, 0],
    [2, 1],
    [2, 14],
    [2, 12],
    [2, 13],
    [2, 6],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 15],
    [2, 7],
    [14, 0],
    [14, 1],
    [14, 2],
    [14, 6],
    [14, 3],
    [14, 4],
    [14, 5],
    [14, 7],
    [12, 1],
    [12, 6],
    [12, 7],
    [9, 3],
    [13, 1],
    [13, 2],
    [13, 6],
    [13, 4],
    [13, 5],
    [13, 7],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 12],
    [6, 13],
    [6, 3],
    [6, 10],
    [6, 4],
    [6, 5],
    [6, 15],
    [6, 7],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 14],
    [3, 9],
    [3, 6],
    [3, 4],
    [3, 5],
    [3, 15],
    [3, 7],
    [10, 6],
    [11, 5],
    [11, 7],
    [8, 4],
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 14],
    [7, 12],
    [7, 13],
    [7, 6],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 15],
    [7, 11],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 14],
    [4, 13],
    [4, 6],
    [4, 3],
    [4, 8],
    [4, 7],
    [4, 5],
    [15, 4],
    [15, 7],
    [15, 3],
    [15, 6],
    [15, 2],
    [15, 1],
    [15, 0],
    [15, 5],
    [5, 15],
    [5, 4],
    [5, 7],
    [5, 11],
    [5, 3],
    [5, 3],
    [5, 6],
    [5, 13],
    [5, 14],
    [5, 2],
    [5, 1],
    [5, 0],
  ];

  const links = _links.map((item) => ({
    source: item[0],
    target: item[1],
  }));

  const nodeLinkCounts = new Array(companies.length).fill(0);
  links.forEach((link) => {
    nodeLinkCounts[link.source]++;
    nodeLinkCounts[link.target]++;
  });

  // 定义节点颜色列表
  const nodeColors = [
    '#E1CAFC', '#EBF26B', '#FFAB5F', '#FFF7C7', '#A9D6FF', '#FFD4D9',
    '#F7FFC5', '#FFE576', '#9FE8FF', '#FC7E99', '#E1FFFA', '#C5FFF4',
    '#FF8F43', '#53DBEA', '#FFE564', '#FFFC97'
  ];

  // 为特定公司指定颜色
  const specificColors = {
    // 通过ID指定所有公司颜色 (ID从0开始)
    0: '#FFF7C7', // 成都来者教育科技有限公司（DBC职梦）
    1: '#EBF26B', // 成都萌想科技有限责任公司（实习僧）
    2: '#FFAB5F', // 互联派教育科技（大连）有限公司（互联派）
    3: '#FFD4D9', // 北京爱思益咨询有限公司（爱思益）
    4: '#A9D6FF', // 蔓藤教育咨询（北京）有限公司
    5: '#F7FFC5', // 北京淘友天下科技发展有限公司
    6: '#FFE576', // 成都先胜信息科技有限公司（offer先生）
    7: '#E1CAFC', // 职优你（上海）教育科技有限公司（unicareer）
    8: '#9FE8FF', // 北京集思未来科技有限公司
    9: '#53DBEA', // 圈里网络科技（广州）有限公司（懂职帝）
    10: '#FC7E99', // 远方有录科技（北京）股份有限公司
    11: '#E1FFFA', // 奥弗（深圳）科技有限公司
    12: '#C5FFF4', // 海马中际教育科技集团有限公司（海马职加）
    13: '#FF8F43', // 上海瀚泊科技集团有限公司（翰泊职培）
    14: '#FFE564', // 北京旷智信息科技有限公司（途鸽求职）
    15: '#FFFC97'  // 南京美之桥教育咨询有限公司
  };

  const nodes = companies.map((company, index) => {
    // 确定节点颜色：优先使用特定颜色，如果没有则使用默认颜色
    let nodeColor;
    if (specificColors[index] !== undefined) {
      nodeColor = specificColors[index];
    } else if (specificColors[company.name] !== undefined) {
      nodeColor = specificColors[company.name];
    } else {
      nodeColor = nodeColors[index % nodeColors.length];
    }

    return {
      id: index,
      name: company.name,
      symbolSize: 20 + nodeLinkCounts[index] * 5,
      category: company.category,
      itemStyle: {
        color: nodeColor,
        borderColor: '#fff',
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.2)'
      },
      label: {
        // position: 'right',
        formatter: "{b}",
        fontSize: 12,
        color: "#333",
        distance: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: [3, 5],
        borderRadius: 3,
        lineHeight: 18,
        align: 'center',
        // borderWidth: 1,
        // borderColor: '#000',
      },
    };
  });

  const option = {
    // title: {
    //   text: "企业关系网络图",
    //   top: "top",
    //   left: "center",
    //   textStyle: {
    //     fontSize: 18,
    //   },
    // },
    tooltip: {
      formatter: "{b}",
    },
    legend: {
      show: false,
    },
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "企业关系网络",
        type: "graph",
        layout: "circular",
        circular: {
          rotateLabel: true,
        },
        zoom: 0.6,
        data: nodes,
        links: links,
        categories: companies.map((company) => ({ name: company.name })),
        roam: true,
        label: {
          show: true,
        },
        lineStyle: {
          color: "#888",
          opacity: 0.6,
          width: 2,
          curveness: 0,
        },
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: [0, 8],
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 3,
            color: "#aaa",
            opacity: 1,
          },
          itemStyle: {
            opacity: 1,
            borderWidth: 2,
            borderColor: '#fff'
          },
          label: {
            fontSize: 14,
            fontWeight: "bold",
          },
        },
        blur: {
          itemStyle: {
            opacity: 0.3,
          },
          lineStyle: {
            opacity: 0.1,
          },
          label: {
            opacity: 0.3,
          },
        },
      },
    ],
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
  
  // setTimeout(() => {
	//   const splash = document.getElementById('splash');
	//   splash.style.height = '0px';
  // }, 3000);
  
})();

// 在现有脚本最后添加以下代码
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.3, // 元素进入视口30%时触发
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dialogues = entry.target.querySelectorAll('.dialogue');
                dialogues.forEach((dialogue, index) => {
                    // 添加动画类并设置延迟
                    setTimeout(() => {
                        dialogue.classList.add('animate__animated', 
                            index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'
                        );
                    }, index * 200); // 保持原有延迟间隔
                });
            }
        });
    }, observerOptions);

    // 监听对话容器
    const container = document.querySelector('.dialogue-container');
    if (container) observer.observe(container);
});
