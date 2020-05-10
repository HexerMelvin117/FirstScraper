import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ProductStore } from '../contexts/ProductsContext';
import { Store } from '../contexts/UserContext'
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface FieldComponents {
    prodId: number
    productTitle: string,
    value: string,
    imgSrc: string,
    url: string
}

const ProductCard: React.FC<FieldComponents> = ({ productTitle, value, imgSrc, url, prodId }) =>  {
  const { dispatch } = useContext(ProductStore)
  const userCon = useContext(Store)
  const classes = useStyles();

  const removeFromDatabase = async () => {
    let response = await axios.post('http://localhost:8080/auth/removeproduct', 
    {productId: prodId, token: userCon.state.token})
    console.log(response)
  }

  const handleRemoval = () => {
    removeFromDatabase();
    dispatch({
      type: 'REMOVE_PRODUCT',
      payload: prodId
    });
  }

  return (
    <Card className={classes.root} raised={true} style={{margin: 10, backgroundColor: "#212121"}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2" style={{color: "#eeeeee"}}>
            {productTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{color: "#eeeeee"}}>
            ${value}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={url} target="_blank">
          View in Amazon
        </Button>
        <Button size="small" color="primary" onClick={() => handleRemoval()}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard