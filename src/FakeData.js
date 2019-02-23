const FakeListData = [
  {
    id: 1,
    image: {
      source: require('~/assets/images/item-1.jpg'),
      width: 414,
      height: 516,
    },
    payload: {
      imageHeaderText: 'Fantasy Astrology',
      imageBottom: {
        text: "Let's go to a new world right now.",
        type: 'NORMAL',
      },
      detailContents: [
        {
          type: 'TEXT',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan cursus dolor in cursus. Proin a dolor lobortis quam ultricies sollicitudin ac eget orci. Cras pretium turpis sed nisl consectetur convallis. Aliquam posuere fermentum tellus sit amet pretium. Cras sem ex, posuere vel tempus sit amet, gravida vitae nisi. Proin congue aliquam dictum. Etiam quis neque mattis, ultrices elit nec, pharetra lacus. Phasellus viverra ligula non ante bibendum porttitor. Etiam aliquam molestie facilisis. Donec non ornare metus. Pellentesque non gravida ex.',
        },
        {
          type: 'IMAGE',
          value: require('~/assets/images/item-1-1.jpg'),
          width: 260,
          height: 180,
        },
        {
          type: 'TEXT',
          value: 'Nulla fringilla feugiat justo, at convallis eros ullamcorper fringilla. In hac habitasse platea dictumst. Nam id nulla ut eros ornare mattis ut ut eros. Cras suscipit eros augue, eget sagittis mi efficitur quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida odio nec risus egestas efficitur. Aenean ut porta ante. Nulla orci quam, dapibus id mi quis, facilisis ultricies odio.',
        },
        {
          type: 'IMAGE',
          value: require('~/assets/images/item-1-2.jpg'),
          width: 260,
          height: 360,
        },
        {
          type: 'TEXT',
          value: 'Phasellus purus odio, finibus vel lobortis vitae, hendrerit vitae odio. Donec auctor porta diam sit amet pulvinar. In scelerisque augue nisi, et posuere lorem volutpat in. In tristique elit sed erat scelerisque, non vestibulum nisi posuere. Aliquam et egestas quam. Duis a sollicitudin sem, et ullamcorper tortor. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada tellus eget risus dapibus imperdiet. Cras non elit ante. Quisque nec laoreet augue.`',
        },
      ],
    },
  },
  {
    id: 3,
    image: {
      source: require('~/assets/images/item-3.jpg'),
      width: 414,
      height: 414,
    },
    payload: {
      imageBottom: {
        text: "Today's\nApp",
        type: 'BOLD',
      },
      cardContent: {
        type: 'DOWNLOAD',
        appName: 'Dog Together',
        category: 'Life & Style',
        appImage: require('~/assets/images/item-3-app.jpg'),
        backgroundColor: '#222',
        color: '#fff',
        buttonBackgroundColor: '#fff',
        buttonColor: '#222',
      },
      detailContents: [
        {
          type: 'TEXT',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan cursus dolor in cursus. Proin a dolor lobortis quam ultricies sollicitudin ac eget orci. Cras pretium turpis sed nisl consectetur convallis. Aliquam posuere fermentum tellus sit amet pretium. Cras sem ex, posuere vel tempus sit amet, gravida vitae nisi. Proin congue aliquam dictum. Etiam quis neque mattis, ultrices elit nec, pharetra lacus. Phasellus viverra ligula non ante bibendum porttitor. Etiam aliquam molestie facilisis. Donec non ornare metus. Pellentesque non gravida ex.',
        },
        {
          type: 'TEXT',
          value: 'Nulla fringilla feugiat justo, at convallis eros ullamcorper fringilla. In hac habitasse platea dictumst. Nam id nulla ut eros ornare mattis ut ut eros. Cras suscipit eros augue, eget sagittis mi efficitur quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida odio nec risus egestas efficitur. Aenean ut porta ante. Nulla orci quam, dapibus id mi quis, facilisis ultricies odio.',
        },
        {
          type: 'IMAGE',
          value: require('~/assets/images/item-3-1.jpg'),
          width: 260,
          height: 180,
        },
        {
          type: 'TEXT',
          value: 'Phasellus purus odio, finibus vel lobortis vitae, hendrerit vitae odio. Donec auctor porta diam sit amet pulvinar. In scelerisque augue nisi, et posuere lorem volutpat in. In tristique elit sed erat scelerisque, non vestibulum nisi posuere. Aliquam et egestas quam. Duis a sollicitudin sem, et ullamcorper tortor. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada tellus eget risus dapibus imperdiet. Cras non elit ante. Quisque nec laoreet augue.`',
        },
        {
          type: 'TEXT',
          value: 'Nulla fringilla feugiat justo, at convallis eros ullamcorper fringilla. In hac habitasse platea dictumst. Nam id nulla ut eros ornare mattis ut ut eros. Cras suscipit eros augue, eget sagittis mi efficitur quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida odio nec risus egestas efficitur. Aenean ut porta ante. Nulla orci quam, dapibus id mi quis, facilisis ultricies odio.',
        },
        {
          type: 'IMAGE',
          value: require('~/assets/images/item-3-2.jpg'),
          width: 260,
          height: 180,
        },
        {
          type: 'TEXT',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan cursus dolor in cursus. Proin a dolor lobortis quam ultricies sollicitudin ac eget orci. Cras pretium turpis sed nisl consectetur convallis. Aliquam posuere fermentum tellus sit amet pretium. Cras sem ex, posuere vel tempus sit amet, gravida vitae nisi. Proin congue aliquam dictum. Etiam quis neque mattis, ultrices elit nec, pharetra lacus. Phasellus viverra ligula non ante bibendum porttitor. Etiam aliquam molestie facilisis. Donec non ornare metus. Pellentesque non gravida ex.',
        },
      ],
    },
  },
  {
    id: 2,
    image: {
      source: require('~/assets/images/item-2.jpg'),
      width: 414,
      height: 414,
    },
    payload: {
      cardContent: {
        type: 'TEXT',
        categoryText: 'Featured App',
        mainText: 'Magic Mirror Ball',
        subText: 'Everything in the world looks upside down.',
      },
      detailContents: [
        {
          type: 'TEXT',
          value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan cursus dolor in cursus. Proin a dolor lobortis quam ultricies sollicitudin ac eget orci. Cras pretium turpis sed nisl consectetur convallis.',
        },
        {
          type: 'IMAGE',
          value: require('~/assets/images/item-2-1.jpg'),
          width: 260,
          height: 180,
        },
        {
          type: 'TEXT',
          value: 'Nulla fringilla feugiat justo, at convallis eros ullamcorper fringilla. In hac habitasse platea dictumst. Nam id nulla ut eros ornare mattis ut ut eros. Cras suscipit eros augue, eget sagittis mi efficitur quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida odio nec risus egestas efficitur. Aenean ut porta ante. Nulla orci quam, dapibus id mi quis, facilisis ultricies odio.',
        },
        {
          type: 'TEXT',
          value: 'Nulla fringilla feugiat justo, at convallis eros ullamcorper fringilla. In hac habitasse platea dictumst. Nam id nulla ut eros ornare mattis ut ut eros. Cras suscipit eros augue, eget sagittis mi efficitur quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida odio nec risus egestas efficitur. Aenean ut porta ante. Nulla orci quam, dapibus id mi quis, facilisis ultricies odio.',
        },
        {
          type: 'TEXT',
          value: 'Phasellus purus odio, finibus vel lobortis vitae, hendrerit vitae odio. Donec auctor porta diam sit amet pulvinar. In scelerisque augue nisi, et posuere lorem volutpat in. In tristique elit sed erat scelerisque, non vestibulum nisi posuere. Aliquam et egestas quam. Duis a sollicitudin sem, et ullamcorper tortor. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada tellus eget risus dapibus imperdiet. Cras non elit ante. Quisque nec laoreet augue.`',
        },
      ],
    },
  },
];

export default FakeListData;
