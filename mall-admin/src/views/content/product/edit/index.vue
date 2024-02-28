<template>
  <div>
    <el-form ref="form" :model="form" size="large" label-width="90px" :rules="rules">
      <el-form-item prop="name" label="商品名称">
        <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="subTitle" label="小标题">
        <el-input v-model="form.subTitle" placeholder="请输入商品小标题"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item required prop="categoryId" label="分类">
            <el-select v-model="form.categoryId" class="select-style" placeholder="请选择" :loading="isLoadingCategory">
              <el-option v-for="item in categoryList" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required prop="stock" label="库存">
            <el-input-number class="width-style" v-model="form.stock" :min="0" :max="Number.MAX_VALUE" placeholder="请输入商品库存" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item required prop="originalPrice" label="原价">
            <el-input-number class="width-style" v-model="form.originalPrice" :precision="2" :step="0.1" :min="0" :max="Number.MAX_VALUE / 100" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="promotePrice" label="优惠价">
            <el-input-number class="width-style" v-model="form.promotePrice" :precision="2" :step="0.1" :min="0" :max="Number.MAX_VALUE / 100" placeholder="不填则无优惠" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="productImageList" label="轮播图">
        <div>
          <el-upload
            ref="refProductImage"
            v-model:file-list="fileProductImageList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-remove="uploadProductImageRemove"
            :http-request="uploadProductImage"
            :limit="5"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="el-upload__tip">
            只允许上传 jpg/png 格式的图片，且大小不超过 2 MB。上传的第一张图片将会作为封面。
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="productDetailImageList" label="详情图">
        <div>
          <el-upload
            ref="refProductDetailImage"
            v-model:file-list="fileProductDetailImageList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-remove="uploadProductDetailImageRemove"
            :http-request="uploadProductDetailImage"
            :limit="10"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="el-upload__tip">
            只允许上传 jpg/png 格式的图片，且大小不超过 2 MB。
          </div>
        </div>
      </el-form-item>
      <el-form-item label="详情图预览">
        <div class="custom-markdown-style preview">
          <img v-for="item in fileProductDetailImageList" :src="item.customRealURL ? item.customRealURL : ''" alt="商品详情图片">
        </div>
      </el-form-item>
      <el-form-item v-if="!isEdit">
        <el-button type="primary" @click="submitForm()">保存</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="saveEdit()">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible">
      <img class="width-style" :src="dialogImageUrl" alt="预览图片" />
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { getAllCategory } from "@/api/category"
import router from "@/router";
import { addProductImage } from "@/api/product_image";
import { addProduct, getProduct, updateProduct } from "@/api/product";
export default {
  data() {
    return {
      //上传的商品轮播图列表
      fileProductImageList: [],
      //上传的商品详情图列表
      fileProductDetailImageList: [],
      form: {
        //商品名称
        name: "",
        //小标题
        subTitle: "",
        //所属分类id
        categoryId: "",
        //原始价格
        originalPrice: 0,
        //优惠价格
        promotePrice: null,
        //库存
        stock: 0,
        //商品轮播图列表（每个元素都是一个 url 字符串）
        productImageList: [],
        //商品详情图列表（每个元素都是一个 url 字符串）
        productDetailImageList: []
      },
      //分类对象列表
      categoryList: [
        {
          "id": "",
          "name": ""
        }
      ],
      isLoadingCategory: true,
      isLoadingTag: true,
      //表单验证规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        categoryId: [
          { 
            validator: (rule, value, callback) => {
              if(value == null || value == "") {
                callback(new Error("请选择分类"));
              } else {
                callback();
              }
            },
            trigger: 'blur' 
          }
        ],
        originalPrice: [
          {
            validator: (rule, value, callback) => {
              if(value == null) {
                callback(new Error("请输入原始价格"));
              } else if(value < 0) {
                callback(new Error("原始价格必须大于等于 0"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        promotePrice: [
          {
            validator: (rule, value, callback) => {
              if(value != null && value < 0) {
                callback(new Error("优惠价格必须大于等于 0"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        stock: [
          {
            validator: (rule, value, callback) => {
              if(value == null) {
                callback(new Error("请输入库存"));
              } else if(value < 0) {
                callback(new Error("库存必须大于等于 0"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      },
      //是否处于编辑模式
      isEdit: false,
      dialogVisible: false,
      dialogImageUrl: "",
      //删除文件时跳过删除对话框提示
      skipDeleteDialogue: false
    }
  },
  methods: {
    /**
     * 提交之前对表单的处理
     */
    submitBefore(that) {
      let form = that.form;
      form.originalPrice = that.form.originalPrice;
      form.promotePrice = that.form.promotePrice;
      form.productImageList = [];
      form.productDetailImageList = [];
      //校验成功
      if(form.originalPrice != null) {
        form.originalPrice = parseInt(form.originalPrice * 100);
      }
      if(form.promotePrice != null) {
        form.promotePrice = parseInt(form.promotePrice * 100);
      }
      for(let i in that.fileProductImageList) {
        form.productImageList.push(that.fileProductImageList[i].customRealURL);
      }
      for(let i in that.fileProductDetailImageList) {
        form.productDetailImageList.push(that.fileProductDetailImageList[i].customRealURL);
      }
      //返回处理完成的 form
      return form;
    },
    /**
     * 提交表单
     */
    submitForm() {
      const that = this;
      //表单校验
      this.$refs['form'].validate((valid, fields) => {
        if(valid) {
          let form = that.submitBefore(that);
          addProduct(form).then((response) => {
            if(response != null) {
              //添加商品成功
              ElMessage.success("添加成功");
              //重置表单
              that.$refs['form'].resetFields();
              //进行路由跳转
              router.push("/index/content/product");
            }
          });
        }
      });
    },
    /**
     * 更新商品
     */
    saveEdit() {
      const that = this;
      //表单校验
      this.$refs['form'].validate((valid, fields) => {
        if(valid) {
          let form = that.submitBefore(that);
          updateProduct(form).then((response) => {
            if(response != null) {
              //添加商品成功
              ElMessage.success("更新成功");
              //重置表单
              that.$refs['form'].resetFields();
              //路由跳转
              router.push("/index/content/product");
            }
          });
        }
      });
    },
    /**
     * 上传商品轮播图
     */
    uploadProductImage(options) {
      this.upload(options, this.fileProductImageList);
    },
    /**
     * 上传商品详情图
     */
    uploadProductDetailImage(options) {
      this.upload(options, this.fileProductDetailImageList);
    },
    /**
     * 上传商品图片
     */
    upload(options, fileList) {
      const that = this;
      //得到上传文件列表中的文件
      const file = fileList[fileList.length - 1];
      //设置文件的状态为正在上传
      file.status = "uploading";
      //构造请求所需的参数
      let data = new FormData();
      data.append("img", options.file);
      //发送请求
      addProductImage(data, options).then((response) => {
        if(response != null) {
          //自定义属性，将后端的 url 保存到上传的文件对象中
          file.customRealURL = response.data;
          //设置文件上传的状态为成功，并添加回文件列表中（设置为success后自动保留在列表中）
          file.status = "success";
          ElMessage.success("上传成功");
        }
      });
    },
    /**
     * 删除商品轮播图时触发
     */
    uploadProductImageRemove(uploadFile, uploadFiles) {
      return this.uploadRemove(uploadFile, uploadFiles, 'refProductImage');
    },
    /**
     * 删除商品详情图时触发
     */
    uploadProductDetailImageRemove(uploadFile, uploadFiles) {
      return this.uploadRemove(uploadFile, uploadFiles, 'refProductDetailImage');
    },
    /**
     * 文件列表移除前触发
     */
    uploadRemove(uploadFile, uploadFiles, refsName) {
      //如果为 true 直接删除，这是为了在对话框里点确定后不循环触发对话框设计的
      if(this.skipDeleteDialogue) {
        this.skipDeleteDialogue = false;
        return true;
      }
      const that = this;
      ElMessageBox.confirm(
        '确定要删除已上传的文件吗？',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        //确认删除
        that.skipDeleteDialogue = true;
        that.$refs[refsName].handleRemove(uploadFile);
        ElMessage.success("删除成功");
      }).catch(() => {
        //取消删除(外层的返回false本身就是取消删除，所以此处不用做任何事)
      });
      return false;
    },
    handlePictureCardPreview(uploadFile) {
      this.dialogImageUrl = uploadFile.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.isEdit = false;
    //查询所有分类，显示到选择商品分类下拉框中
    getAllCategory().then((response) => {
      if(response != null) {
        this.categoryList = response.data;
        this.isLoadingCategory = false;
      }
    });
    //从商品管理界面点击编辑按钮后
    if(this.$route.params.id[0]) {
      this.isEdit = true;
      getProduct(this.$route.params.id[0]).then((response) => {
        if(response != null) {
          this.form = response.data;
          if(this.form.originalPrice != null) {
            this.form.originalPrice = this.form.originalPrice / 100.0;
          }
          if(this.form.promotePrice != null) {
            this.form.promotePrice = this.form.promotePrice / 100.0;
          }
          if(this.form.productImageList != null) {
            //有商品轮播图，创建假的文件对象，以在界面上显示
            for(let i in this.form.productImageList) {
              this.fileProductImageList.push(
                {
                  name: "商品轮播图" + i,
                  percentage: 0,
                  raw: new File([], "商品轮播图" + i, null),
                  url: this.form.productImageList[i],
                  status: "success",
                  customRealURL: this.form.productImageList[i]
                }
              );
            }
          }
          if(this.form.productDetailImageList != null) {
            //有商品详情图，创建假的文件对象，以在界面上显示
            for(let i in this.form.productDetailImageList) {
              this.fileProductDetailImageList.push(
                {
                  name: "商品详情图" + i,
                  percentage: 0,
                  raw: new File([], "商品详情图" + i, null),
                  url: this.form.productDetailImageList[i],
                  status: "success",
                  customRealURL: this.form.productDetailImageList[i]
                }
              );
            }
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.select-style {
  width: 100%;
}
.width-style {
  width: 100%;
}
.preview {
  width: 500px;
  line-height: 0px;
  padding: 10px;
  background-color: #FAFCFF;
}
</style>