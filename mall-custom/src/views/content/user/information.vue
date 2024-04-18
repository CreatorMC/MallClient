<template>
  <div>
    <el-form :model="form" label-width="80px" :rules="rules">
      <el-form-item prop="avatar" label="当前头像">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称">
        <el-input v-model="form.nickName" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="form.sex" class="ml-4">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
          <el-radio label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userInfo } from '@/api/user';

export default {
  data() {
    return {
      form: {
        //头像链接
        avatar: "",
        //昵称
        nickName: "",
        //性别 0男，1女，2未知
        sex: "2"
      },
      rules: {
        nickName: [
          {
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ]
      }
    } 
  },
  methods: {
    handleAvatarSuccess(response, uploadFile, uploadFiles) {
      if(uploadFile.raw == null) {
        return;
      }
      this.form.avatar = URL.createObjectURL(uploadFile.raw);
    },
    userInfo() {
      userInfo().then((response) => {
        if(response != null) {
          this.form.avatar = response.data.avatar;
          this.form.nickName = response.data.nickName;
          this.form.sex = response.data.sex;
        }
      })
    }
  },
  mounted() {
    this.userInfo();
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  img {
    width: 178px;
    height: 178px;
  }
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>