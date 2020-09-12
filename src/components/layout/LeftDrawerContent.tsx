import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as Icons from '@material-ui/icons';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { useHandleChangeRoute } from './hooks';

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  indent: number;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:focus > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)'
      }
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular
      }
    },
    groupOld: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2)
      }
    },
    group: (props: ComponentProps) => ({
      paddingLeft: (props as any).indent
    }),
    expanded: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit'
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center'
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1
    }
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles(props);
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color='inherit' className={classes.labelIcon} />
          <Typography variant='body2' className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </div>
      }
      style={
        {
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor
        } as any
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label
      }}
      {...other}
    />
  );
}

interface ComponentProps {
  changeRoute?: (route: string) => void;
  route?: string;
  children?: any;
  classes?: any;
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

export default function LeftDrawerContent(props: ComponentProps) {
  const classes = useStyles({});
  const changeRoute = useHandleChangeRoute();
  return (
    <TreeView className={classes.root} defaultCollapseIcon={<Icons.ExpandMore />} defaultExpandIcon={<Icons.ChevronRight />}>
      <StyledTreeItem nodeId='presurvey' labelText='Pre-Survey' labelIcon={Icons.CheckCircle} onClick={changeRoute('/SessionClass')} indent={0} />
      <StyledTreeItem nodeId='lesson' labelText='Lesson' labelIcon={Icons.CheckCircle} onClick={changeRoute('/SessionClass')} indent={0} />
      <StyledTreeItem nodeId='postsurvey' labelText='Post-Survey' labelIcon={Icons.CheckCircle} onClick={changeRoute('/SessionClass')} indent={0} />
      <StyledTreeItem nodeId='resources' labelText='Resources' labelIcon={Icons.CheckCircle} onClick={changeRoute('/SessionClass')} indent={0} />
    </TreeView>
  );
}
