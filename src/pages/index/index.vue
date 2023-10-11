<template>
  <view class="content">
    <block v-if="token === ''">
      <image class="logo" src="/static/logo.png" />
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
      <button class="bind_button" size="large" type="button" @click="bind">登 录</button>
    </block>
    <block v-else>
      <image class="logo" :src="userInfos.photo" />
      <view class="text-area">
        <text class="title">{{ userInfos.userName }}</text>
      </view>
      <button class="bind_button" size="large" type="button" @click="logout">退出</button>
    </block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserInfo } from '@/store/user'
const title = ref('Hello')
const { userInfos, token } = useUserInfo()

const bind = () => {
  uni.navigateTo({
    url: '/pages/login/index',
  })
}

const logout = () => {
  useUserInfo().reset()

  uni.reLaunch({
    url: '/pages/index/index',
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
  border-radius: 100rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
