cnt = memberobj3.map(
  function(item){
    item['성별'] = ((parseInt(item.rrid.charAt(7))%2) == 1)? "남자" : "여자";
    return item;
  }.filter(
    function(item){
      return item.성별 == "여자";
    }.reduce(
      function(previous, current){
        return previous +1;
      }
    )
  )
);
