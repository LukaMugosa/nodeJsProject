const config = require('../../config/config');
class WallpaperDTO {
	constructor(wallpaper) {
		this.wallpaperId = wallpaper.id;
		this.imagePath = config.app.url + wallpaper.image_path;
		this.imageThumbnailPath = config.app.url +  wallpaper.image_thumbnail_path;
		this.price = wallpaper.price;
		this.hasBeenUnlocked = wallpaper.has_been_unlocked ? wallpaper.has_been_unlocked === 1 : null;
	}
}

module.exports = WallpaperDTO;
