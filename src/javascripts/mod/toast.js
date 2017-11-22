//var $ = require('jquery')
require("less/toast.less")

function toast(msg, time){
  this.msg = msg
  this.dismisstime = time || 2000
  this.createToast()
  this.showToast()
}

toast.prototype = {
  createToast: function(){
    var template = '<div class="toast">' + this.msg + '</div>'
    this.$toast = $(template)
    $('body').append(this.$toast)
  },
  showToast: function(){
    var me = this
    this.$toast.fadeIn(300, function(){
      setTimeout(function(){
        me.$toast.fadeOut(300, function(){
          me.$toast.remove()
        })
      }, me.dismisstime)
    })
  }
}

function Toast(msg, time){
  return new toast(msg, time)
}


window.Toast = Toast
module.exports.Toast = Toast