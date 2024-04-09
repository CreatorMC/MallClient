<template>
  <div style="min-height: 500px;">
    <div v-if="isShowPay">
      <div>
        <h1>请在 <span style="color: rgb(255, 80, 0);">{{remainderFormat}}</span> 时间内完成支付，否则订单将过期。</h1>
      </div>
      <div class="title">
        <span>支付方式</span>
      </div>
      <div>
        <el-radio-group v-model="dto.paymentType">
          <el-radio v-for="item in payWay" :label="item.value" :disabled="item.disable">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="title">
        <span>账号余额</span>
      </div>
      <div>
        <span class="realpay--price-symbol">¥</span>
        <span class="realpay--price">{{ parseBalance(balance) == "无" ? 0.00 : parseBalance(balance) }}</span>
      </div>
      <div class="title">
        <span>支付金额</span>
      </div>
      <div>
        <span class="realpay--price-symbol">¥</span>
        <span class="realpay--price">{{ parseBalance(payPrice) == "无" ? 0.00 : parseBalance(payPrice) }}</span>
      </div>
      <div style="margin-top: 10px; text-align: right;">
        <el-button type="danger" size="large" @click="payOrder">
          确认支付
        </el-button>
      </div>
    </div>
    <div v-else>
      <el-result
        icon="error"
        title="订单已失效"
        sub-title="请返回购物车或商品详情页重新发起订单"
      >
      </el-result>
    </div>
  </div>
</template>

<script>
import { parseBalance } from '@/utils/util';
import { getUserBalance } from '@/api/user';
import { getOrderPrice, payOrder } from '@/api/order';

export default {
  props: [
    'id',
    'modelValue'
  ],
  emits: ['update:modelValue'],
  data() {
    return {
      //支付方式
      payWay: [
        {
          name: "支付宝",
          value: 1,
          disable: true
        },
        {
          name: "微信",
          value: 2,
          disable: true
        },
        {
          name: "余额",
          value: 3,
          disable: false
        }
      ],
      //账号余额
      balance: null,
      //支付金额
      payPrice: null,
      //剩余支付时间（秒）
      remainder: 600,
      //是否显示支付
      isShowPay: true,
      dto: {
        id: this.id,
        paymentType: 3
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
    getOrderPrice() {
      getOrderPrice(this.id).then((response) => {
        if(response != null) {
          this.payPrice = response.data;
        }
      });
    },
    payOrder() {
      //是否支付成功
      let isSuccess = false;
      this.dto.id = this.id;
      payOrder(this.dto).then((response) => {
        if(response != null) {
          isSuccess = true;
          console.log("支付成功");
        }
      }).finally(() => {
        if(!isSuccess) {
          //支付失败
        }
      });
    },
    parseBalance(balance) {
      return parseBalance(balance);
    }
  },
  mounted() {
    if(this.id == null) {
      this.$router.push("/");
      return;
    }
    this.stepIndex = 1;
    this.getUserBalance();
    this.getOrderPrice();
    //循环定时器
    const timer = setInterval(() => {
      this.remainder--;
      if(this.remainder <= 0) {
        //显示订单失效提示
        this.isShowPay = false;
        clearInterval(timer);
      }
    }, 1000)
  },
  computed: {
    remainderFormat() {
      let m = Math.floor(this.remainder / 60);
      let s = this.remainder % 60;
      return "" + (m.toString().length < 2 ? ("0" + m) : m) + ":" + (s.toString().length < 2 ? "0" + s : s);
    },
    stepIndex: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  font-weight: bold;
  line-height: 32px;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 10px;
}
.realpay--price-symbol {
  font-size: 26px;
  margin-right: 4px;
  color: #999;
}
.realpay--price {
  color: rgb(255, 80, 0);
  font: 700 26px tahoma;
}
</style>