const MenuItem = ({ option }) => {
  const { item_name, price, description, image_url, category } = option;

  return (
    <section className='MenuItem'>
      <div className='MenuItem__img'>
        <img alt={item_name} src={image_url} />
      </div>
      <div className='MenuItem_info'>
        <h1>{item_name}</h1>
        <p>Price: ${price}.00</p>
        <p>Description: {description}</p>
        <p>Category: {category}</p>
      </div>
    </section>
  );
};

export default MenuItem;
