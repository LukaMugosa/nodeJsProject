module.exports = {
	up: async (queryInterface) => queryInterface.bulkInsert('wallpapers', [
		{
			price: 20,
			image_path: '/AssetBundles/AlbumImages/img0.jpg',
			image_thumbnail_path: '/AssetBundles/AlbumImages/imgt0.jpg',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			price: 20,
			image_path: '/AssetBundles/AlbumImages/img1.png',
			image_thumbnail_path: '/AssetBundles/AlbumImages/img1.png',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	], {}),
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('wallpapers', null, {});
	}
}
