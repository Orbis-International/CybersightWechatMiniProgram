// index.js
// 获取应用实例
const app = getApp()

const CONSULT_USERNAME = 'aubry.lungu@orbis.org';
const CONSULT_PASSWORD = '123456';

// Define your API URL and credentials
const apiUrl = 'https://www.cybersight.org.cn//wp-json/wp/v2/webinar'; // Replace with your API URL
const username = 'aubry.lungu@orbis.org'; // Replace with your username
const password = '123456'; // Replace with your password

// Create a Base64-encoded string of your credentials
const base64Credentials = wx.arrayBufferToBase64(new TextEncoder().encode(`${username}:${password}`));


// webinar/webinar.js
Page({

  /**
   * Page initial data
   */
  data: {
    status : "webinar",
    webinarList: [],
    filteredwebinarList: [] // Initialize an empty filteredwebinarList
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getwebinar();
  },

  getwebinar() {
    const that = this; // Store the reference to the Page instance
  
    // Make the HTTP request
    wx.request({
      url: apiUrl,
      method: 'GET',
      header: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/json',
      },
      success: function (res) {
        // Handle the successful response here
        console.log('Request successful', res.data);

        // Store data
        that.saveAPIResources(res.data)

        // Update page view with teh data
        that.updatePageView()
      },
      fail: function (err) {
        // Handle any errors that occur during the request
        console.error('Request failed', err);
      }
    });
  },

  saveAPIResources(data){
    this.data.status = data[0].id;
    this.data.webinarList = data;
  },
  
  updatePageView(){
    this.setData({
      status: this.data.status,
      webinarList : this.data.webinarList,
      filteredwebinarList: this.data.webinarList
    })
  },

  onSearchInput: function (event) {
    const searchText = event.detail.value.toLowerCase();
    
    // Filter the webinarList based on the search text
    const filteredwebinars = this.data.webinarList.filter(item => {
      return item.title.rendered.toLowerCase().includes(searchText) || item.content.rendered.toLowerCase().includes(searchText);
    });

    // Update filteredwebinarList with the filtered webinars
    this.setData({
      filteredwebinarList: filteredwebinars
    });
  },

  onTapwebinar() {
    // Handle the tap event for the webinar
    wx.showToast({
      title: 'webinar',
    });
  },

  onTapLibrary() {
    // Handle the tap event for the library
    wx.showToast({
      title: 'Library',
    });
  },

  onTapWebinar() {
    // Handle the tap event for the webinar
    wx.showToast({
      title: 'Webinar',
    });
  },

  onTapHome() {
    // Handle the tap event for the webinar
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  

})
