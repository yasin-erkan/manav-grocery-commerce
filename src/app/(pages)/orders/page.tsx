import {getOrders} from '@/app/service/order-service';
import {formatDate} from '@/app/utils/format-date';
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Sipariş durumunu belirle
const getOrderStatus = (order: any) => {
  const orderDate = new Date(order.createdAt);
  const now = new Date();
  const diffHours = Math.abs(now.getTime() - orderDate.getTime()) / 36e5;

  if (diffHours < 24) return 'preparing';
  if (diffHours < 48) return 'shipping';
  return 'delivered';
};

// Durum ikonunu ve rengini belirle
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'preparing':
      return {
        icon: <FaClock className="text-yellow-500" />,
        text: 'Hazırlanıyor',
        color: 'bg-yellow-50 text-yellow-700',
      };
    case 'shipping':
      return {
        icon: <FaTruck className="text-blue-500" />,
        text: 'Yolda',
        color: 'bg-blue-50 text-blue-700',
      };
    case 'delivered':
      return {
        icon: <FaCheckCircle className="text-green-500" />,
        text: 'Teslim Edildi',
        color: 'bg-green-50 text-green-700',
      };
    default:
      return {
        icon: <FaTimesCircle className="text-red-500" />,
        text: 'İptal Edildi',
        color: 'bg-red-50 text-red-700',
      };
  }
};

export default async function Orders() {
  const {orders} = await getOrders();

  // Siparişleri tarihe göre sırala (en yeniden en eskiye)
  const sortedOrders = orders?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (!sortedOrders || sortedOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Siparişlerim</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FaBox className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Henüz Siparişiniz Yok
          </h2>
          <p className="text-gray-500 mb-6">
            Alışverişe başlamak için ürünlerimize göz atın.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Siparişlerim</h1>

      <div className="space-y-6">
        {sortedOrders.map(order => {
          const status = getOrderStatus(order);
          const statusInfo = getStatusInfo(status);

          return (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {order.product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Sipariş Tarihi: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {order.money_spend}₺
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.quantity} {order.product.unit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={order.product.photo}
                      alt={order.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {order.product.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FaTruck className="text-green-600" />
                      <span className="text-gray-600">
                        {order.is_delivery
                          ? `Teslimat Adresi: ${order.delivery_address}`
                          : 'Mağazadan Teslim Alınacak'}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span className="text-sm font-medium">
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Müşteri: {order.customer_name}</p>
                    <p>Telefon: {order.customer_phone}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
