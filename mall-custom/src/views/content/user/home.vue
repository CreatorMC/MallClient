<template>
  <div>
    <div class="s-userbar">
      <el-space style="width: 100%;" size="large">
        <el-avatar :size="60" :src="(user.avatar != null && user.avatar != '') ? user.avatar : '/img/default_head.png'" />
        <h3>{{ user.nickName }}</h3>
        <div></div>
        <div style="min-width: max-content;">
          <span class="realpay--price-symbol">余额：¥</span>
          <span class="realpay--price">{{ parseBalance(balance) == "无" ? 0 : parseBalance(balance) }}</span>
        </div>
      </el-space>
    </div>
  </div>
</template>

<script>
import { parseBalance } from '@/utils/util';
import { userInfo, getUserBalance } from '@/api/user';

export default {
  data() {
    return {
      balance: 0,
      user: {
        //头像链接
        avatar: "",
        //邮箱
        email: "",
        //用户id
        id: "",
        //昵称
        nickName: "",
        //性别 0男，1女，2未知
        sex: ""
      }
    }
  },
  methods: {
    getUserBalance() {
      getUserBalance().then((response) => {
        if(response != null) {
          this.balance = response.data;
        }
      })
    },
    userInfo() {
      userInfo().then((response) => {
        if(response != null) {
          this.user = response.data;
        }
      })
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    this.getUserBalance();
    this.userInfo();
  }
}
</script>

<style lang="scss" scoped>
.s-userbar {
  background-color: #f5f8fa;
  border: 1px solid #e4eaee;
  display: flex;
  align-items: center;
  padding: 20px;
  :deep(.el-space__item:nth-child(3)) {
    flex-grow: 1;
  }
}
.realpay--price-symbol {
  font-size: 20px;
  margin-right: 4px;
  color: #999;
}
.realpay--price {
  color: rgb(255, 80, 0);
  font: 700 20px tahoma;
}
</style>