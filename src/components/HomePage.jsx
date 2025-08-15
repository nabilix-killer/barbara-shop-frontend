import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBag, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw, 
  Headphones,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useFeaturedProducts, useCategories } from '../hooks/useProducts'
import ProductCard from './ProductCard'

const HomePage = () => {
  const { products: featuredProducts, loading: productsLoading, error: productsError } = useFeaturedProducts(3)
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $100"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free returns"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New Collection Available
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Barbara Shop
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Discover premium products across fashion, electronics, home goods, and beauty. 
                  Quality meets style in every purchase.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group" asChild>
                  <Link to="/catalog">
                    Shop Now
                    <ShoppingBag className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/catalog/fashion">
                    Explore Fashion
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8/5</span>
                  <span>Customer Rating</span>
                </div>
                <div>
                  <span className="font-medium">10K+</span>
                  <span className="ml-1">Happy Customers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <img
                        src="/src/assets/images/fashion/fashion_1.jpg"
                        alt="Fashion"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <img
                        src="/src/assets/images/electronics/electronics_1.jpg"
                        alt="Electronics"
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <img
                        src="/src/assets/images/beauty_health/beauty_health_1.jpg"
                        alt="Beauty"
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <img
                        src="/src/assets/images/home_garden/home_garden_1.jpg"
                        alt="Home & Garden"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections across different categories
            </p>
          </motion.div>

          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : categoriesError ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading categories: {categoriesError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const images = [
                  '/src/assets/images/fashion/fashion_1.jpg',
                  '/src/assets/images/electronics/electronics_1.jpg',
                  '/src/assets/images/home_garden/home_garden_1.jpg',
                  '/src/assets/images/beauty_health/beauty_health_1.jpg'
                ];
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={images[index] || images[0]}
                            alt={category.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-lg">{category.name}</h3>
                            <p className="text-sm opacity-90">{category.description}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <Button variant="ghost" className="w-full group" asChild>
                            <Link to={`/catalog/${category.name.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}>
                              Shop Now
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and highly-rated products
            </p>
          </motion.div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : productsError ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading featured products: {productsError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" asChild>
              <Link to="/catalog">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

