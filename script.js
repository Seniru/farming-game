var animalNo = 0;
var cropsNo = -1;
var decNum = 0;
var decorations = [];
var animals = {};
var crops = {};
var selectionMode = "none";
var fields = 0;
var wallet =100;
var dict = {};
var inventory = {};//fig name amount id
var inventoryOpened = false;
var shopOpened = false;
function animal(n,fig,size,price,products) {
    
    animalNo += 1;
    this.n = n;
    this.fig = fig;
    this.size = size; //max 128
    this.price = size;
    this.products = products;
    getAnimalCount = function() {return animalNo};
    return this;
    }
function crop(id,n,fig,growTime,price,sellPrice,cropNum) {
    cropsNo += 1;
  
    dict[fig] = cropsNo ;
    dict[n] = cropsNo;
    inventory[cropsNo] = [fig,n,0,cropsNo]; 
   this.id = id;
    this.n = n;
    this.fig = fig;
    this.price = price;
    this.sellPrice = sellPrice;
    this.growTime = growTime ;
    this.cropNum = cropNum ;
    return this;
}

function decoration(fig,n,price,size) {
    this.id = decNum++;
    this.fig = fig;
    this.n = n;
    this.price = price;
    this.size = size;   
    dict[fig] = this.id;
}

 animals[0] = new animal("cow","🐄",100,1000,["milk"]);
 animals[1] = new animal(0,"pig","🐖",30,200,["mud"]);
crops[0] = new crop(0,"Tomato","🍅",17000,7,10,10);
 crops[1] = new crop(1,"Corn","🌽",30000,10,15,10);
 crops[2] = new crop(2,"Chillies","🌶",35000,17,25,10)
 crops[3] = new crop(3,"Mushroom","🍄",50000,20,30,10);
crops[4] = new crop(4,"Brinjal","🍆",60000,50,65,10);
 crops[5] = new crop(5,"Grapes","🍇",90000,100,130,20);
 crops[6] = new crop(6,"Strawberry","🍓",120000,160,200,20);
 crops[7] = new crop(7,"Sweet potato","🍠",120000,170,200,10);
  crops[8] = new crop(8,"Clover","🍀",220000,80,100,20);
  crops[9] = new crop(9,"Tulip","🌷",240000,350,400,10);
  crops[10] = new crop(10,"Rose","🌹",250000,500,700,10);
 crops[11] = new crop(11,"Rice","🌾",360000,650,700,20);
 
 
 decorations[0]=  new decoration("💩","POO",30,15);
 decorations[1] = new decoration("🚩","Flag",80,25);
 decorations[2] = new decoration("📪","Post box",150,25);
 decorations[3] = new decoration("⛽","Fuel shed",300,30);
 decorations[4] = new decoration("⛳","Golf pitch",350,30);
 decorations[5] = new decoration("🎁","Gift",500,20);
 decorations[6] = new decoration("⛄","Snow man",550,30);
 
$(document).ready(function() {
   openMenu("#helpmenu");
   
 for(ci=0;ci<cropsNo+1;ci++) {
$("#cropmenu").append("<h4>"+crops[ci].fig+""+crops[ci].n+"</h4><br><Price: 💵"+crops[ci].price+"<br>Sell price: 💵 "+crops[ci].sellPrice+"<br>Grow time: ⏳ "+crops[ci].growTime/1000+"s<br>Crop number: "+crops[ci].cropNum+"<br><hr>");}
  for(rows=0;rows<$("body").innerHeight()/1;rows++) {
      $("#gamearea").append("<tr></tr>");}
        for(cols=0;cols<$("body").innerWidth()/40+1;cols++) {
            $("tr").append("<td></td>")
        }
    $("td").click(function(){
    if (selectionMode == "plotting") {
       
       fields += 1;
       $(this).html("<button onclick='javascript:void(farm(event))'class='field' id='field"+fields+"'></button>");
      
     
  } else if(selectionMode.substring(0,6)=="decors"){
  
  if(wallet -decorations[dict[selectionMode.substring(6)]].price >= 0) {
  
  wallet -= decorations[dict[selectionMode.substring(6)]].price;
  $("#wallet").html("Wallet: 💵"+wallet);
      $(this).html("<span style='font-size:"+decorations[dict[selectionMode.substring(6)]].size+"px'>"+selectionMode.substring(6)+"</span>");
      }
  }
  
   });
  
    $("#plot").click(function(){
    selectionMode = "plotting";
    $("td").addClass("gridview");
    $("article>table").addClass("cLT");
   $(".doneBtn").animate({left:"20px",bottom:"30px"}); 
    });

    $("#inventory").click(function(){
    if (!inventoryOpened) {
       $("body").append("<div class='inventory'></div>");$(".inventory").fadeOut();}
      inventoryOpened = true;
       $(".inventory").slideToggle(500);
       $(".inventory").html(" <button class='close' onclick='javascript:void($(this).parent().slideToggle(400))'>X</button>  <h1>Inventory</h1>");  for(j=0;j<Object.keys(inventory).length;j++) {

          $(".inventory").append(inventory[j][0]+": "+inventory[j][2]+"<button onclick='sell(this.id.substring(4),10)' id='sell"+inventory[j][0]+"'>Sell</button><br>");
           
        }
       
    });
  $("#shop").click(function(){
  openShop();
  });
   $(".doneBtn").click(function(){
   
      selectionMode = "none";
    $("td").removeClass("gridview").addClass("normalview"); 
         $(".doneBtn").animate({left:"-200px"});
   });
  $("#menu").click(function(){
      $("ul").toggle().animate({left:"-40px"});
  });
  $("#close").click(function(){
  $("ul").animate({left:"-400px"},400);
  $("ul").toggle(400);
  });

  
});


function farm(event) {
try {
    if ($("#"+event.target.id).html() == "" && selectionMode.substring(0,1) != "none" && wallet-crops[dict[selectionMode]].price>=0) {
          grow(event.target.id,crops[parseInt(dict[selectionMode])]);
   wallet -= crops[dict[selectionMode]].price;
        $("#wallet").html("Wallet: 💵"+wallet);
    } else if($("#"+event.target.id).html() != "🌱🌱🌱🌱🌱🌱" && $("#"+event.target.id).html() != "") {
 
   
     
     inventory[crops[dict[$("#"+event.target.id).html().substring(4,6)]].id][2] += parseInt(crops[dict[$("#"+event.target.id).html().substring(4,6)]].cropNum);
     
        $("#"+event.target.id).html("");
    }
    } catch (e) {
        $("#"+event.target.id).html("");
    }
}
function grow(field,plant) {
 $("#"+event.target.id).html("🌱🌱🌱🌱🌱🌱");
    setTimeout(function(){
    $("#"+field).html(plant.fig+plant.fig+plant.fig+plant.fig+plant.fig+plant.fig);
    },plant.growTime);}
function sell(product,n)  {
if(inventory[crops[dict[product]].id][2]>0){
   wallet += crops[dict[product]].sellPrice;
   inventory[crops[dict[product]].id][2] -= n; 
   $(".inventory").html("<button class='close' onclick='javascript:void($(this).parent().slideToggle(400))'>X</button>  <h1>Inventory</h1>");
   
    for(a=0;a<Object.keys(inventory).length;a++) {

           $(".inventory").append(inventory[a][0]+": "+inventory[a][2]+"<button onclick='sell(this.id.substring(4),10)' id='sell"+inventory[a][0]+"'>Sell</button><br>");
        }
        $("#wallet").html("Wallet: 💵"+wallet);
   }  
}
function openShop()  {
    
    if (!shopOpened) {
       $("body").append("<div class='shop'></div>");$(".shop").fadeOut();}
      shopOpened = true;
       $(".shop").slideToggle(500).html(" <button class='close' onclick='javascript:void($(this).parent().slideToggle(400))'>X</button> <h1>Shop</h1><button id='Crops' class='tab' onclick='javascript:void(openCrops ())'>Crops</button><button id='decor' class='tab' onclick='javascript:void(openDecor())'>Decorations</button><br><div id='list'></div>");
     openCrops();
}
 function buyCrops(item) {
    $(".shop").slideToggle(500);
    $(".doneBtn").animate({left:"20px",bottom:"30px"});
     selectionMode = item;
 }
function openMenu(elem) {
    $(elem).toggle(400)
    
}
function openDecor()  {
    $("#list").html("");
    for (let i in decorations) {
        $("#list").append(decorations[i].fig+":<button onclick='javascript:void(selectDecors())' id='"+decorations[i].fig+"' >Select</button> Price: 💵"+decorations[i].price+"<br>");
    }
} 

function openCrops() {
      $("#list").html("");
       for(s=0;s<Object.keys(crops).length;s++) {
     $("#list").append(crops[s].fig+": <button  id='c"+crops[s].fig+"'onclick='buyCrops(this.id.substring(1))'>Select</button> Price: 💵"+crops[s].price+"<br>");     
     }    
}
function selectDecors() {
    //console.log(event.target.id);
    $(".shop").slideToggle();
    selectionMode = "decors"+event.target.id;    
     $("td").addClass("gridview");
     $(".doneBtn").animate({left:"20px",bottom:"30px"});
     
}
