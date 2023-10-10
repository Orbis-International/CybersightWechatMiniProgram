// index.js
// 获取应用实例
const app = getApp()

// Define your API URL and credentials
const apiUrl = 'https://www.cybersight.org.cn//wp-json/wp/v2/course'; // Replace with your API URL
const username = 'nicholas.muchelemba@orbis.org'; // Replace with your username
const password = 'NicoBravo@97'; // Replace with your password

// Create a Base64-encoded string of your credentials
const base64Credentials = wx.arrayBufferToBase64(new TextEncoder().encode(`${username}:${password}`));

var sanitizedData =[];
var sanitizedContent =[];
// course/course.js
Page({

  /**
   * Page initial data
   */
  data: {
    status : "<p>This is a <strong>sample</strong> text with tags.</p>",
    courseList: [],
    filteredCourseList: [] // Initialize an empty filteredCourseList
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getCourse();
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },

  getCourse() {
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
    // this.data.status = data[0].id;
    sanitizedData = data.map(item => {
      sanitizedContent = item.content.rendered.replace(/<[^>]*>/g, ''); // Removes HTML tags
      return { ...item, content: { ...item.content, rendered: sanitizedContent } };
    });

    this.data.courseList = sanitizedData;
    console.log(sanitizedData)
  },
  
  updatePageView(){
    this.setData({
      status: this.data.status.replace(/<[^>]*>/g, ''),
      courseList : this.data.courseList,
      filteredCourseList: this.data.courseList
    })
  },

  onSearchInput: function (event) {
    const searchText = event.detail.value.toLowerCase();
    
    // Filter the courseList based on the search text
    const filteredCourses = this.data.courseList.filter(item => {
      return item.title.rendered.toLowerCase().includes(searchText) || item.content.rendered.toLowerCase().includes(searchText);
    });

    // Update filteredCourseList with the filtered courses
    this.setData({
      filteredCourseList: filteredCourses
    });
  },

  onTapCourse() {
    // Handle the tap event for the course
    wx.showToast({
      title: 'Course',
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
