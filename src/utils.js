import { version } from "react";

export const isJsonString = (data) => {
    try {
      JSON.parse(data);
      return true; // Thêm dòng này để trả về true nếu parse thành công
    } catch (error) {
      return false;
    }
  }

  export const getBase64 = (file) => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
export const renderOptions = (arr) => {
    let results=[]
    if(arr){
      results = arr?.map((opt) => {
        return{
          value: opt,
          label: opt
        }
      })
    }
    results.push({
      label: 'Thêm loại',
      value: 'add_type'
    })
    return results


}


export const initFacebookSDK = () => {
  if(window.FB) {
    window.FB.XFBML.parse()
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID,
      cookie: true,
      xfbml:true,
      version:"v2.1"
    });
  };
  (function(d,s,id){
    console.log(s);
    var js,
    fjs = d.getElementsByTagName(s)[0];
    if(d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src =`//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js,fjs);
  })(document,"script", "facebook-jssdk");
};