var Pixel = function(x, y, size, color) {
	this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.dir = 0;
  this.angle = 0;
}

Pixel.prototype.draw = function() {
	context.fillStyle = this.color;
  context.fillRect((this.x - (this.size / 2)), (this.y - (this.size / 2)), this.size, this.size);
}

var Artwork = function() {
	this.pixel_list = [];
  this.previous;
  this.prevIndex;
  this.bottomLeft = [];
  this.topRight = [];
  this.centerOffset = [];
  this.center = [];
  this.dir = 0;
}

Artwork.prototype.draw = function() {
	this.centerOffset[0] = this.topRight[0] - this.bottomLeft[0];
  this.centerOffset[1] = this.topRight[1] - this.bottomLeft[1];
  this.center[0] = this.bottomLeft[0] + this.centerOffset[0];
  this.center[1] = this.bottomLeft[1] + this.centerOffset[1];
	this.pixel_list.forEach(function (item, index) {
  	item.dir += this.dir;
  	context.clearRect((item.x - (item.size / 2)), (item.y - (item.size / 2)), item.size, item.size);
  	item.draw();
	});
}

Artwork.prototype.add = function(pixel) {
	this.pixel_list.push(pixel);
  this.previous = pixel;
  this.prevIndex = this.pixel_list.length - 1;
  
  if (pixel.x < this.bottomLeft[0] || this.bottomLeft[0] === undefined) {
  	this.bottomLeft[0] = pixel.x;
  } 
  
  if (pixel.x > this.topRight[0] || this.topRight[0] === undefined) {
  	this.topRight[0] = pixel.x;
  }
  
  if (pixel.y < this.bottomLeft[1] || this.bottomLeft[1] === undefined) {
  	this.bottomLeft[1] = pixel.y;
  }
  
  if (pixel.y > this.topRight[1] || this.topRight[1] === undefined) {
  	this.topRight[1] = pixel.y;
  }
}

Artwork.prototype.deletePrev = function() {
	this.pixel_list.pop();
}

Artwork.prototype.deleteAll = function() {
	this.pixel_list = [];
}

Artwork.prototype.deleteIndex = function(index) {
	this.pixel_list.splice(index);
}

Artwork.prototype.getPrev = function() {
	return [this.previous, this.prevIndex];
}

Artwork.prototype.changeX = function(x) {
	this.pixel_list.forEach( function(item, index) {
  	item.x += x;
  });
}

Artwork.prototype.changeY = function(y) {
	this.pixel_list.forEach( function(item, index) {
  	item.y += y;
  })
}
