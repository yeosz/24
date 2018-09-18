export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '24点计算小游戏，益智又好玩',
        path: '/pages/home/index',
        imageUrl: '/image/share.png'
      };
    },
    ...options
  });
}
