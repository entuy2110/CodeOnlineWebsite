import React, { useEffect, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { VisitorsTable } from 'components/VisitorsTable/VisitorsTable';

export const CheckVisitorDialog = (props: any) => {
  const { onClose, open, visitors } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth="md" >
      <VisitorsTable
        visitors={visitors}
      />
    </Dialog>
  );
}
