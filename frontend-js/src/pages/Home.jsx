import { useEffect } from 'react';
import Slider from '../components/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSliders } from '../redux/slider';
import Category from '../components/Category';
import { fetchAllCategories } from '../redux/category';
import Product from '../components/Product';
import { fetchProducts } from '../redux/product';
import { LoadingIndicator } from '../components/Loading';

export default function Home() {
  const myslider = useSelector((state) => state.slider);

  const mycategory = useSelector((state) => state.category);
  const myproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { loading, sliders, error } = myslider;

  const { loading: loadingProduct, error: errorProduct, products } = myproduct;

  const { loading: loadingCat, error: errorCat, categories } = mycategory;

  const isLoading = loading || loadingProduct || loadingCat;

  const isError = error || errorProduct || errorCat;

  useEffect(() => {
    dispatch(fetchAllSliders());
    dispatch(fetchAllCategories());
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : isError ? (
        <isError error={isError} />
      ) : (
        <>
          <Slider sliders={sliders} />
          <Category categories={categories} />
          <Product products={products} />
        </>
      )}
    </>
  );
}
