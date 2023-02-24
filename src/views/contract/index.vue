<template>
  <div class="contract">
    <!-- 搜索 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="query.name"
        @input="getList"
      ></el-input>
    </div>
    <!-- 表格 -->
    <div class="input-manager-table">
      <el-table :data="lists" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="identity_card"
          label="身份证号"
        ></el-table-column>
        <el-table-column prop="file_path" label="合同状态">
          <template slot-scope="{ row }">
            <el-tag :type="row.file_path | statusTypeFilter">{{
              row.file_path | statusFilter
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="handleCreate(row)"
              :disabled="row.status != 5"
              >生成合同</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleDownload(row)"
              :disabled="row.status < 7"
              >下载合同</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows"
    ></el-pagination>
  </div>
</template>

<script>
import {
  contractList,
  contractCreateFile,
  contractDownload,
} from "@/api/article";
import { getToken } from "@/utils/cookie";
export default {
  name: "contract",
  data() {
    return {
      lists: [],
      rows: 1,
      pages: 1,
      query: {
        pageNo: 1, // 当前页码
        pageSize: 10, // 当前页数
        name: "",
      },
    };
  },
  methods: {
    getList() {

      contractList(this.query).then((res) => {
        console.log(res);
        if (res.code === 20000) {
          this.lists = res.data.data.data;
          this.rows = res.data.rows;
          this.pages = res.data.pages;
        }
      });
    },
    handleCreate(row) {
      contractCreateFile({ id: row.id }).then((res) => {
        if (res.code === 20000) {
          this.getList();
          this.$message({
            type: "success",
            message: "生成合同提交成功",
            duration: 2000,
          });
        }
      });
    },
    handleDownload(row) {
      contractDownload({ id: row.id }).then((res) => {
        console.log(res);
        if (res.code == "20000") {
          this.$notify({
            title: "下载合同",
            message: "下载合同提交成功",
            type: "success",
            duration: 2000,
          });

          let url = res.data.url;
          let name = url.substring(url.lastIndexOf("/"), url.length);
          console.log(url, ',',name, "===========");
          this.downloadUrlFile(url);
        }
      });
    },
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest(); //调用XHR  通过请求获取数据流
      xhr.open("GET", url, true);
      xhr.withCredentials = true; //允许携带cookie
      xhr.responseType = "blob"; //响应类型  blob字节流
      xhr.setRequestHeader("token", getToken()); //传入token
      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log(xhr);
          //获取图片blob数据并保存responseURL
          var filename = xhr.responseURL.substring(
            xhr.responseURL.lastIndexOf("/") + 1
          );
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send(); //发送
    },
    saveAs(name, data) {
      var urlObject = window.URL; //window对象的URL对象是专门用来将blob或者file读取成一个url的。
      var export_blob = new Blob([data]); //代表二进制类型的大对象,就是Blob对象是二进制数据
      var save_link = document.createElement("a"); //创建a标签
      save_link.href = urlObject.createObjectURL(export_blob); //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
      //download是 HTML5 中<a>标签新增的一个属性，此属性会强制触发下载操作，指示浏览器下载 URL 而不是导航到它，并提示用户将其保存为本地文件
      save_link.download = name;
      save_link.click(); //触发a标签单击
    },
    // 当前条数变化
    handleSizeChange(val) {
      this.query.pageSize = val || this.query.pageSize;
      this.getList(); // 重新调用查询接口
    },
    // 当前页变化
    handleCurrentChange(val) {
      this.query.pageNo = val || this.query.pageNo;
      this.getList(); // 重新调用查询接口
    },
  },
  filters: {
    statusTypeFilter(type) {
      if (type) {
        return "success";
      } else {
        return "primary";
      }
    },
    statusFilter(type) {
      if (type) {
        return "已生成合同";
      } else {
        return "未生成合同";
      }
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.contract {
  margin-top: 20px;
}
</style>
