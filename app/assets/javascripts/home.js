function basicV(I,R) {
  V = I * R;
  console.log(V)
}

function seriesV(I,R) {
  rSum = 0
  for (var i=0; i < R.length; i++) {
    rSum = R[i] + rSum;
  }
  V = I * rSum;
  console.log(V);
}


function parallelV(I,R) {

  function sum(R) {
    rSum = 0;
    for (var i=0; i<R.length; i++){
      rSum = rSum + R[i];
    }
  }

  function product(R){
    rProduct = 1;
    for (var i=0; i<R.length; i++){
      rProduct = R[i] * rProduct; 
    }
  }
  
  sum(R);
  product(R);
  rTotal = 0;
  rTotal = rProduct / rSum;
  V = I * rTotal;

  // console.log(rTotal);
  console.log(V);
  

}



$(document).ready( function() {

  basicV(2,5);
  seriesV(3,[1,2,3]);
  parallelV(6, [2,2,2])

});

