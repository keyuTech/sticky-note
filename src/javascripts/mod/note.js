require('less/note.less')

var Toast = require('./toast.js').Toast
var Event = require('mod/event.js')

function Note(items){
  this.init(items)
  this.createNote()
  this.setStyle()
  this.bindEvent()
}

Note.prototype = {
  colors: [
    ['#ea9b35','#efb04e'],
    ['#dd598b','#e672a2'],
    ['#eee34b','#f2eb67'],
    ['#c24226','#d15a39'],
    ['#c1c341','#d0d25c'],
    ['#3f78c3','#5591d2']
  ],
  defaultItems: {
    id: '',
    $ct: $('#content').length>0?$('#content'):$('body'),
    context: 'input here'
  },
  initItems: function(items){
    this.items = $.extend({}, this.defaultItems, items || {})
    if(this.items.id){
      this.id = this.items.id
    }
  },
  createNote: function(){
    var template = `<div class="note">
                    <div class="note-head"><span class="delete">$times;</span></div>
                    <div class="note-ct" contenteditable="true"></div>
                    </div>`
    this.$note = $(template)
    this.$note.find('.note-ct').html(this.items.context)
    this.items.$ct.append(this.$note)
    if(!this.id) this.$note.css('bottom', "10px")
  },
  setStyle: function(){
    var color = this.colors[Math.floor(Math.random()*6)]
    this.$note.find('.note-head').css('background-color', color[0])
    this.$note.find('.note-ct').css('background-color', color[1])
  },
  setLayout: function(){
    var me = this
    if(me.clock){
      clearTimeout(me.clock)
    }
    me.clock = setTimeout(function(){
      Event.fire('waterfall')
    }, 100)
  },
  bindEvent: function(){
    var me = this,
        $note = this.$note,
        $noteHead = $note.find('note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete')
    $delete.on('click', function(){
      me.delete()
    })
    $noteCt.on('focus', function(){
      if($noteCt.html()=='input here') $noteCt.html('')
      $noteCt.data('before', $noteCt.html())
    }).on('blur paste', function(){
      if($noteCt.data('before') != $noteCt.html()){
        $noteCt.data('before', $noteCt.html())
        me.setStyle()
        if(me.id){
          me.edit($noteCt.html())
        }else{
          me.add($noteCt.html())
        }
      }
    })

    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,
          evtY = e.pageY - $note.offset().top
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY})
    }).on('mouseup', function(){
      $note.removeClass('draggable').removeData('pos')
    })

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,
        left: e.pageX-$('.draggable').dta('evtPos').x
      })
    })
  },

  edit: function(msg){
    var me = this
    $.post('/api/note/edit', {
      id: this.id,
      note: msg
    }).done(function(ret){
      if(ret.status === 0){
        Toast('update success')
      }else{
        Toast(ret.errorMsg)
      }
    })
  },

  add: function(msg){
    var me = this
    $.post('/api/notes/add', {note: msg}).done(function(ret){
      if(ret.status === 0){
        Toast('add success')
      }else{
        self.$note.remove()
        Event.fire('waterfall')
        Toast(ret.errorMsg)
      }
    })
  },

  delete: function(){
    var me = this
    $.post('/api/notes/delete', {id: this.id}).done(function(ret){
      if(ret.status === 0){
        Toast('delete success')
        me.$note.remove()
        Event.fire('waterfall')
      }else{
        Toast(ret.errorMsg)
      }
    })
  }
}


module.exports.Note = Note