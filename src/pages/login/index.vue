<template>
  <view id="login" style="background: url('../../static/img/login-bg.png')">
    <view class="login-box">
      <view class="login-img-box">
        <image class="login-img" src="../../static/img/login-logo.png" mode="widthFix" />
      </view>
      <view class="input-frame">
        <input v-model="usernameOrPhone" type="text" placeholder="请输入登录账号" class="account-input" />
      </view>
      <view class="input-frame">
        <input v-model="password" type="password" placeholder="请输入登录密码" class="account-input" />
      </view>
      <view class="login-psw-box">
        <checkbox-group class="login-text-psw" name="" @change="checkChange">
          <checkbox :checked="checked" />
          <view>记住密码</view>
        </checkbox-group>
        <view class="login-text-psw" @tap="goResetPsw"> 忘记密码？ </view>
      </view>
      <button class="login-submit_button" size="large" type="button" @click="bind">登 录</button>
      <view class="go-reg-box">
        <text> 还没有账号？ </text>
        <text class="go-reg" @tap="goReg"> 立即注册> </text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import type { ILogin, ILoginParams } from '@/types/user'
import { useUserInfo } from '@/store/user'
import { ref } from 'vue'
import { signIn } from '@/api/login'
let checked = ref(false)

const checkChange = () => {
  checked.value = !checked.value
}

let usernameOrPhone = ref('admin')
let password = ref('123456')

const clearContent = (type) => {
  if (type === 1) {
    usernameOrPhone.value = ''
  } else {
    password.value = ''
  }
}
const goReg = () => {
  uni.navigateTo({
    url: '/pages/common/regCheck',
  })
}
const goResetPsw = () => {
  uni.navigateTo({
    url: '/pages/common/resetPswCheck',
  })
}
const bind = async () => {
  let params: ILoginParams = {
    page: 1,
    pageSize: 20,
    usernameOrPhone: usernameOrPhone.value,
    password: password.value,
  }

  // 获取code
  const result = await uni.login({
    provider: 'weixin',
  })
  // 获取用户信息
  const userInfo = await uni.getUserInfo({
    provider: 'weixin',
  })
  console.log(userInfo)

  if (result.errMsg === 'login:ok') {
    console.log(result.code)
    params.code = result.code

    // 获取用户信息
    const loginResult = await signIn(params)

    useUserInfo().setUserInfos(loginResult.data as ILogin)
    useUserInfo().setToken(loginResult.data!.token)
    goHome()
  }
}
const goHome = () => {
  uni.navigateTo({
    url: '/pages/index/index',
  })
}
</script>

<style lang="scss" scoped>
.go-reg-box {
  text {
    color: #00071e;
  }

  margin-top: 25upx;
  text-align: center;

  .go-reg {
    color: #335ff2;
  }
}

#login {
  float: left;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100vh;
  background-position: center;

  .login-box {
    background: #fff;
    padding: 300upx 40upx 80upx;
    text-align: center;
    margin: 0 auto;
    position: relative;
    border-radius: 60upx;
    color: #cccccc;
    width: 640upx;
    margin-top: 350upx;
    z-index: 1;

    .login-img-box {
      position: absolute;
      top: -250upx;
      left: 0upx;
      width: 640upx;
      .login-img {
        width: 500upx !important;
      }
    }

    .login-title {
      width: 400upx !important;
      margin-top: 60upx;
    }
  }
  .input-frame {
    width: 100%;
    height: 90upx;
    background: #f7f7f7;
    border-radius: 40upx;
    position: relative;
    margin-top: 36upx;
    &:nth-child(2) {
      margin-top: 36upx;
    }
    .account-input {
      float: left;
      height: 90upx;
      width: calc(100% - 100upx);
      line-height: 90upx;
      margin-left: 30upx;
      font-size: 30upx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999;
      text-align: left;
    }
  }
  .login-psw-box {
    margin-top: 20upx;
    display: flex;
    justify-content: space-between;

    checkbox {
      transform: scale(0.6);
    }
    .login-text-psw {
      color: #335ff2;
      display: flex;
    }
  }

  .login-submit_button {
    border-radius: 40upx;
    height: 90upx;
    line-height: 90upx;
    font-size: 36upx;
    text-align: center;
    background: linear-gradient(269deg, #1c48d7, #3965f9);
    box-shadow: 2px 3px 16px 0px rgba(0, 60, 255, 0.4);
    outline: none;

    margin-top: 50upx;
  }
}
</style>
