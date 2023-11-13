import { Card, CardActionArea, CardContent, Grid, Stack, Typography, IconButton, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import useAxios from 'hooks/useAxios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
const Data = (props) => {
  const isAdmin = useSelector((state) => state.token.isadmin.isadmin);

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [rowId, setRowId] = useState(props.rowId);
  const [field, setField] = useState(props.field);
  const { fetchData } = useAxios(`schedules/${rowId}`, 'PATCH', { [props.field]: title });
  return (
    <Grid item xs={6} sx={{ mt: 0.5 }}>
      <CardActionArea>
        <Card sx={{ backgroundColor: props.background ? props.background : 'white' }}>
          <IconButton
            aria-label="edit"
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => {
              if (edit) {
                if (!title) {
                  Swal.fire({
                    icon: 'info',
                    title: 'Route Schedule',
                    text: 'Please input a valid description',
                    allowOutsideClick: false,
                    confirmButtonText: 'Ok'
                  });
                  return;
                } else {
                  fetchData();
                }
              }
              setEdit(!edit);
            }}
          >
            {edit ? <SaveOutlined /> : isAdmin && <EditOutlined />}
          </IconButton>
          <CardContent sx={{ flex: 1, ml: -1, mt: -1 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={5} sx={{ px: 2 }}>
              {edit ? (
                <TextField
                  required
                  fullWidth
                  id="routeField"
                  label=""
                  name="routeField"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  autoFocus
                />
              ) : (
                <Typography
                  component="h6"
                  variant="h6"
                  textAlign="center"
                  sx={{ color: props.color ? props.color : 'black' }}
                  style={{ whiteSpace: 'pre', textAlign: 'justify' }}
                >
                  {title}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Data;
