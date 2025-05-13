import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import {getProductById, updateProduct} from '../services/productService';
import { API_URL } from '../config/api';
import { submitReview, getReviewsByProductId } from '../services/productService';
import ShippingInfo from './componentPages/ShippingInfo';
import ReviewForm from "./componentPages/ReviewForm";
export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const filters = location.state?.filters;
    const page = location.state?.page;

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [reviews, setReviews] = useState([]);

    const [newReview, setNewReview] = useState({
        name: '',
        rating: 5,
        content: '',
        recommend: false,
        quality: 5,
        shipping: 5,
        service: 5,
    });

    const handleReviewChange = (field, value) => {
        setNewReview((prev) => ({ ...prev, [field]: value }));
    };

    const handleReviewSubmit = async (rData) => {
        try {
            const reviewData = { productId: id, ...rData };

            // Submit review
            await submitReview(reviewData);

            // get review list of this
            const updatedReviews = await getReviewsByProductId(id);
            setReviews(updatedReviews);

            // Calculate rating
            const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
            const avgRating = Math.round(totalRating / updatedReviews.length);

            //  API update rating
            await  updateProduct(id,JSON.stringify({ rating: avgRating }));

            // update product state with new rating
            setProduct(prev => ({ ...prev, rating: avgRating }));

            alert("Thanks for your feedback!");
            setNewReview({
                name: '',
                rating: 5,
                content: '',
                recommend: false,
                quality: 5,
                shipping: 5,
                service: 5,
            });
        } catch (err) {
            console.error('Failed to submit review or update rating:', err);
            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                const firstImg = data.images?.[0] || data.image;
                setSelectedImage(firstImg);

                const reviewList = await getReviewsByProductId(id);
                setReviews(reviewList);
            } catch (err) {
                console.error('Failed to fetch product:', err);
            }
        };

        fetch();
    }, [id]);

    if (!product) {
        return (
            <Layout>
                <div className="text-center py-20">Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <button
                    onClick={() => navigate('/shop', { state: { filters, page } })}
                    className="text-orange-500 text-sm mb-6 hover:underline"
                >
                    ← Back to Shop
                </button>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div>
                        <img
                            src={selectedImage.startsWith('./img') ? selectedImage : `${API_URL}${selectedImage}`}
                            alt="Selected"
                            className="w-full h-[400px] object-contain rounded border mb-4"
                        />
                        <div className="flex gap-2 flex-wrap">
                            {[...(product.images || [product.image])].map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.startsWith('./img') ? img : `${API_URL}${img}`}
                                    alt={`thumb-${idx}`}
                                    className={`w-16 h-16 object-cover cursor-pointer border rounded ${
                                        selectedImage === img ? 'border-orange-500' : 'border-gray-300'
                                    }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-600 mb-2">#{product.code}</p>
                        <p className="text-xl font-semibold text-red-600 mb-4">
                            {Number(product.price).toLocaleString()} ₫
                        </p>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
                        <p className="text-sm text-yellow-600 mb-4">Rating: {product.rating} ★</p>
                        <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                            Add to Cart
                        </button>
                        <ShippingInfo/>
                    </div>
                </div>

                {/* Detail */}
                {product.descriptionDetail && (
                    <div className="mt-12 border-t pt-6">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">Product Detail</h2>
                        <div
                            className="prose max-w-none text-gray-800"
                            dangerouslySetInnerHTML={{ __html: product.descriptionDetail }}
                        />
                    </div>
                )}

                {/* Reviews Section */}
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-2">TimboCraft has 32 reviews ⭐⭐⭐⭐⭐</h2>

                    {/* Tabs */}
                    <div className="flex gap-6 text-sm border-b mt-4 mb-6">
                        <button className="py-2 px-1 border-b-2 border-orange-500 font-semibold text-gray-800">
                            This item <span className="bg-gray-200 px-2 rounded text-xs">5</span>
                        </button>
                        <button className="py-2 px-1 text-gray-600 hover:text-gray-800">
                            Other items <span className="bg-gray-100 px-2 rounded text-xs">27</span>
                        </button>
                    </div>

                    {/* Review list */}
                    <div className="space-y-10">
                        {reviews.map((review, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2 text-yellow-500 text-sm mb-2">
                                    {'★'.repeat(review.rating)}
                                </div>
                                <p className="text-gray-800 mb-2">{review.content}</p>

                                {review.recommend && (
                                    <p className="text-green-600 text-sm mb-2">✓ Recommends this item</p>
                                )}

                                <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-2">
                                    {review.quality && (
                                        <span>Item quality <b>{review.quality} ★</b></span>
                                    )}
                                    {review.shipping && (
                                        <span>Shipping <b>{review.shipping} ★</b></span>
                                    )}
                                    {review.service && (
                                        <span>Customer service <b>{review.service} ★</b></span>
                                    )}
                                </div>

                                <div className="text-sm text-gray-500">
                                    <span>{review.avatar}</span>{' '}
                                    <span className="font-semibold">{review.name}</span>{' '}
                                    <span className="text-gray-400">• {review.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Review Form */}
                <div className="mt-12 border-t pt-6">
                    <h3 className="text-xl font-bold mb-4">Write a review</h3>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                </div>

            </div>
        </Layout>
    );
}
