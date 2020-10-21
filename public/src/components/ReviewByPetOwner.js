import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

function ReviewByPetOwner(props) {
  const classes = useStyles();
  return (
    <div>
      <Card fluid className={classes.leftAlign}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Reviews Given
          </Typography>
          <Typography variant="body2" component="p">
            You have no given any review. Request for Caretaker and you will be able to give a review.
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  leftAlign: {
    itemAlign: "left",
    textAlign: "left"
  }
}));

export default ReviewByPetOwner;
