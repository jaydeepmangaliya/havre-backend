import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout, updateProfile } from '@/lib/authSlice';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, User, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

// Mock address and orders for demo
const mockAddress = {
  name: 'John Doe',
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'USA',
};

const mockOrders = [
  {
    id: 'ORD-1001',
    date: '2024-06-20',
    total: 29.99,
    status: 'Delivered',
    items: 2,
  },
  {
    id: 'ORD-1000',
    date: '2024-06-10',
    total: 15.5,
    status: 'Shipped',
    items: 1,
  },
];

export default function Profile() {
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zip: user?.address?.zip || '',
      country: user?.address?.country || '',
    },
  });

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.zip || '',
        country: user?.address?.country || '',
      },
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name.replace('address.', '')]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateProfile({
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      name: formData.firstName + ' ' + formData.lastName,
    }));
    setEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center p-8 bg-gray-50 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
          <p className="mb-6 text-gray-600">Please log in to view your profile.</p>
          <Button asChild>
            <Link to="/login">Go to Login</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-xl px-4 md:px-8 py-8"
        style={{ width: '80%' }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: User Info & Address */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl font-bold text-amber-700 mb-4">
                {user?.email[0].toUpperCase()}
              </div>
              {editing ? (
                <form className="w-full max-w-xs space-y-3" onSubmit={handleSave}>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full border rounded p-2" required />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full border rounded p-2" required />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded p-2" required type="email" />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border rounded p-2" />
                  <input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" className="w-full border rounded p-2" />
                  <input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" className="w-full border rounded p-2" />
                  <input name="address.state" value={formData.address.state} onChange={handleChange} placeholder="State" className="w-full border rounded p-2" />
                  <input name="address.zip" value={formData.address.zip} onChange={handleChange} placeholder="ZIP" className="w-full border rounded p-2" />
                  <input name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Country" className="w-full border rounded p-2" />
                  <div className="flex gap-2 mt-2">
                    <Button type="submit" className="bg-amber-600 text-white" disabled={loading}>Save</Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    <User className="inline-block w-5 h-5" /> {user?.firstName || ''} {user?.lastName || ''}
                  </h2>
                  <div
                    className="text-gray-500 mb-1 flex items-center gap-2 max-w-xs w-full justify-center"
                    title={user?.email}
                  >
                    <Mail className="inline-block w-4 h-4" />
                    <span className="truncate break-words w-40 block text-center">{user?.email}</span>
                  </div>
                  <div className="text-gray-500 mb-1 flex items-center gap-2">
                    <span className="inline-block w-4 h-4" /> {user?.phone}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Role: <span className="font-semibold text-black">{user?.role}</span>
                  </div>
                  <Button size="sm" className="mt-2 rounded-lg" onClick={handleEdit}>Edit Profile</Button>
                </>
              )}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" /> Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 font-medium">{user?.firstName} {user?.lastName}</div>
                <div className="text-gray-600">{user?.address?.street}</div>
                <div className="text-gray-600">{user?.address?.city}, {user?.address?.state} {user?.address?.zip}</div>
                <div className="text-gray-600">{user?.address?.country}</div>
              </CardContent>
            </Card>
          </div>
          {/* Right: Orders */}
          <div className="flex-1 flex flex-col gap-8">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <div className="text-gray-500">No orders yet.</div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {mockOrders.map(order => (
                      <div key={order.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{order.id}</div>
                          <div className="text-xs text-gray-500">{order.date} • {order.items} item{order.items > 1 ? 's' : ''}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-black">${order.total.toFixed(2)}</div>
                          <div className="text-xs text-green-600 font-semibold">{order.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Button className="w-full py-3 text-lg font-semibold rounded-lg bg-black hover:bg-amber-500 transition-colors mt-4" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}