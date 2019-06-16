<template>
  <div>
    <div class="container-edit clearfix">
      <div class="content-edit">
        标题：
        <input id="inputTitle" type="text" class="title" v-model="title" placeholder="请输入标题">
        作者名：
        <input
          id="inputAuthor"
          type="text"
          class="author"
          v-model="author"
          placeholder="请输入作者名"
          value="宋佰鑫"
        >
        描述：
        <textarea
          id="description"
          type="text"
          rows="1"
          class="content"
          v-model="description"
          placeholder="请输入描述"
        ></textarea>
        HTML内容：
        <textarea
          id="inputHtml"
          type="text"
          rows="1"
          class="content"
          v-model="content"
          placeholder="请输入Html内容"
        ></textarea>
        上传图片：
        <div class="img-box">
          <input
            id="upLoadThumbnail"
            @change="upLoadThumbnail"
            type="file"
            style="display:none"
            accept="image/*"
          >
          <img :src="thumbnail" id="upLoadThumbnailButton" @click="upLoadThumbnailButton">
        </div>
      </div>
      <div class="content-show">
        <h2 id="showTitle"></h2>
        <div id="showHtml"></div>
      </div>
    </div>
    <button type="button" id="submit" @click="submit">提交</button>
    <div>
      <div id="showStatu"></div>
    </div>
  </div>
</template>
<style>
.clearfix:after {
  content: "020";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  zoom: 1;
}
.container-edit {
  display: flex;
  text-align: left;
}
.content-edit {
  flex: 2;
  padding: 10px;
  margin: 0 10px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  display: inline-block;
}
input {
  border-radius: 5px;
  padding: 10px;
  border: solid 0.5px #ddd;
  width: 100%;
  font-size: 15px;
  margin: 0 0 10px 0;
}
input:focus {
  border-color: #2196f3;
  box-shadow: 0 0 5px #03a9f4;
}
textarea {
  width: 100%;
  padding: 10px;
  margin: 0 0 10px 0;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #999;
  border-radius: 5px;
  background: #1d1d1d;
  color: #277fe4;
  font-size: 15px;
  font-family: Microsfot JhengHei UI;
  transition: all 200ms linear;
}
textarea:focus {
  color: #d3d3d3;
  border-color: #2196f3;
  box-shadow: 0 0 5px #03a9f4;
}
.content-show {
  flex: 1;
  padding: 10px;
  border: solid 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  overflow: overlay;
  display: inline-block;
}

h2#showTitle {
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 10px;
  margin: 20px auto;
  text-align: center;
}

#showHtml h3 {
  font-size: 20px;
  margin: 20px 0 10px 0;
}

#showHtml pre {
  width: 100%;
  padding: 10px;
  overflow: overlay;
  background-color: #1d1d1d;
  color: #d3d3d3;
  font-size: 15px;
  border-radius: 5px;
  font-family: Microsfot JhengHei UI;
}

#showHtml p {
  margin: 0 0 20px 0;
  word-wrap: break-word;
  text-indent: 25px;
}
button#submit {
  background: #ffffff;
  cursor: pointer;
  border: solid 0.5px #42b983;
  border-radius: 5px;
  padding: 10px 30px;
  margin: 20px;
  color: #42b983;
  -webkit-transition: color 0.25s, background-color 0.25s;
  -moz-transition: color 0.25s, background-color 0.25s;
  -o-transition: color 0.25s, background-color 0.25s;
  transition: color 0.25s, background-color 0.25s;
}
button#submit:hover {
  background: #42b983;
  color: #ffffff;
}
</style>

<script>
export default {
  name: "editPage",
  data: function() {
    return {
      title: "",
      author: "",
      description: "",
      content: "",
      thumbnail: require("../assets/imgs/httpsvuejs.org.png")
    };
  },
  created: function() {},
  mounted: function() {
    $("textarea")
      .each(function() {
        this.setAttribute(
          "style",
          "height:" + this.scrollHeight + "px;overflow-y:hidden;"
        );
      })
      .on("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
  },
  watch: {
    title(newTitle, oldTitle) {
      $("#showTitle").text(this.title);
    },
    content(newContent, oldContent) {
      $("#showHtml").html(this.content);
    }
  },
  methods: {
    saveArticle: function(url, json) {
      return new Promise((resolve, reject) => {
        Vue.http
          .post(url, json)
          .then(res => {
            //successed
            this.showSaveArticle(res);
          })
          .catch(res => {
            //failed
            this.showSaveArticleError(res);
          });
      });
    },
    showSaveArticle: function(res) {
      $("#showStatu").text(res);
    },
    showSaveArticleError: function(res) {
      $("#showStatu").text(res);
    },
    upLoadThumbnail: function() {
      var files = $("#upLoadThumbnail")[0].files[0];
      if (files) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          $("#upLoadThumbnailButton").attr("src", evt.target.result);
        };
        reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
      } else {
        this.showSaveArticleError("上传失败");
      }
    },
    submit: function() {
      let title = this.title;
      let htmlString = this.content;
      let author = this.author;
      let description = this.description;
      var formData = new FormData();
      formData.append("title", title);
      formData.append("type", "1");
      formData.append("author", author);
      formData.append("description", description);
      formData.append("content", htmlString);
      formData.append("thumbnail", $("#upLoadThumbnail")[0].files[0]);
      this.saveArticle("https://qzapi.songbaixin.com/save_article", formData);
    },
    upLoadThumbnailButton: function() {
      $("#upLoadThumbnail").click();
    }
  }
};
</script>