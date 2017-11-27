var WaterFall = (function(){
  var $ct
  var $items

  function render($c){
    $ct = $c
    $items = $ct.children()

    var nodeWidth = $items.outerWidth(true),
        colNum = parseInt($(window).width()/nodeWidth),
        colSumHeight = []

    for(var i = 0; i<colNum; i++){
      colSumHeight.push(0)
    }

    $items.each(function(){
      var $cur = $(this)
      var index = 0,
          minSumHeight = colSumHeight[0]

      for(var i = 0; i<colSumHeight; i++){
        if(colSumHeight[i] < minSumHeight){
          index = i
          minSumHeight = colSumHeight[i]
        }
      }

      $cur.css({
        left: nodeWidth*index,
        top: minSumHeight
      })
      colSumHeight[index] = $cur.outerWidth(true) + colSumHeight[index]
    })
  }

  $(window).on('resize', function(){
    render($ct)
  })

  return {
    init: render
  }
})()

module.exports = WaterFall