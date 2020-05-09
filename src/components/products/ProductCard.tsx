import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface FieldComponents {
    productTitle: string,
    value: string,
    imgSrc: string,
    url: string
}

const ProductCard: React.FC<FieldComponents> = ({ productTitle, value, imgSrc, url }) =>  {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised={true}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {productTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${value}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={url}>
          View in Amazon
        </Button>
        <Button size="small" color="primary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard