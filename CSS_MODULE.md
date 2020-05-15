##css 作用域是全局的，项目越来越大，人越来越多，命名慢慢成为问题，以下是几种解决命名问题的方案

### 1.BEM
> 以 .block__element--modifier 形式命名，命名有含义，block 可视为模块，有一定作用域含义

### 2.scoped css

> 下面是vue事例
```

<style scoped>
  .example {
    color: red;
  }
</style>

<template>
  <div class="example">hi</div>
</template>

// 转换结果
<style>
  .example[data-v-f3f3eg9] {
    color: red;
  }
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>

```

### 3. css module
> 将 css 的选择器转换成惟一的字符串，运用到 dom。是在用算法命名，记录了人的命名到算法命名的 map 表
简单来说就是 将class命名通过算法hash 产生唯一的类名

> react 有优化插件 react-css-module 利用包装实现不写 import进来的style

```
<style module>
.red {
  color: red;
}
</style>
<template>
  <p :class="$style.red">
    This should be red
  </p>
</template>

// 转换结果
<style module>
._1yZGjg0pYkMbaHPr4wT6P__1 {
  color: red;
}
</style>
<template>
  <p class="_1yZGjg0pYkMbaHPr4wT6P__1">
    This should be red
  </p>
</template>

```

### 4. css in js

> 具有代表性的就是styled-components  最后也是类似于css module的原理，
  只是在那个基础上又更加可拓展， 比如全局主题样式

```
   const Wrapper = styled.div`
    /* 应用于Wrapper组件本身和Wrapper组件里的所有html标签 */
    color: black;

    /* 应用于Wrapper组件里的h3标签 */
    h3 {
    color: red
    }

    /* 应用于Wrapper组件里的className为blue的html标签 */
    .blue {
    color: blue
    }
  `

  render(
    <Wrapper>
      <p>黑色 p 标签 </p>
      <h3>红色 h3 标签</h3> 
      <p className="blue" >蓝色 p 标签</p>
    </Wrapper>
  )
```

```
  // react 中使用 styled-components
  import styled, { ThemeProvider } from 'styled-components';
  
  const Box = styled.div`
    color: ${props => props.theme.color};
  `;
  
  <ThemeProvider theme={{ color: 'mediumseagreen' }}>
    <Box>I'm mediumseagreen!</Box>
  </ThemeProvider>
```



