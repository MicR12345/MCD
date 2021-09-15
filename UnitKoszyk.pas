unit UnitKoszyk;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.Ani, FMX.Layouts, FMX.Gestures,
  FMX.StdCtrls, FMX.Controls.Presentation, FMX.Objects, FMX.ListBox, FMX.Edit,
  Data.DB, IBX.IBCustomDataSet, IBX.IBTable, IBX.IBDatabase, IBX.IBQuery,
  IBX.IBUpdateSQL, FMX.Menus, System.Rtti, FMX.Grid.Style, Fmx.Bind.Grid,
  System.Bindings.Outputs, Fmx.Bind.Editors, Data.Bind.EngExt,
  Fmx.Bind.DBEngExt, Data.Bind.Components, Data.Bind.Grid, FMX.ScrollBox,
  FMX.Grid, Data.Bind.DBScope, FMX.ListView.Types, FMX.ListView.Appearances,
  FMX.ListView.Adapters.Base, Datasnap.DBClient, FMX.ListView, Datasnap.Provider;

type
  TKoszykForm = class(TForm)
    StyleBook1: TStyleBook;
    ToolbarHolder: TLayout;
    ToolbarPopup: TPopup;
    ToolbarPopupAnimation: TFloatAnimation;
    ToolBar1: TToolBar;
    ToolbarApplyButton: TButton;
    ToolbarCloseButton: TButton;
    ToolbarAddButton: TButton;
    Panel1: TPanel;
    IconLogo: TImage;
    IconCart: TImage;
    IconHambMenu: TImage;
    IconSearch: TImage;
    IconCartDot: TImage;
    IconLeftArrow: TImage;
    IconMenu: TImage;
    LabelUser: TLabel;
    LabelModel: TLabel;
    EditSearch: TEdit;
    Label3: TLabel;
    IBTransaction1: TIBTransaction;
    IBUpdateSQL1: TIBUpdateSQL;
    qryCart: TIBQuery;
    IconX: TImage;
    Rectangle1: TRectangle;
    AnimShowEdit: TFloatAnimation;
    AnimHideEdit: TFloatAnimation;
    PopupHambMenu: TPopupMenu;
    MenuItem1: TMenuItem;
    MenuItem2: TMenuItem;
    MenuItem3: TMenuItem;
    BtnDelete: TButton;
    CheckBoxSelectAll: TCheckBox;
    ListView1: TListView;
    ClientDataSet1: TClientDataSet;
    BtnSubmitOrder: TButton;
    Rectangle2: TRectangle;
    PopupDelete: TPopupMenu;
    MenuItem4: TMenuItem;
    MenuItem5: TMenuItem;
    DataSource1: TDataSource;
    BindingsList1: TBindingsList;
    LinkListControlToField1: TLinkListControlToField;
    qryCartELEMENT_KOD: TIBStringField;
    qryCartELEMENT_NAZWA: TIBStringField;
    qryCartJEDNOSTKI_KOD: TIBStringField;
    qryCartILOSC: TFloatField;
    DataSetProvider1: TDataSetProvider;
    qryDelete: TIBQuery;
    qryCartMCD_DYSPOZYCJE_KOSZYK_ID: TIntegerField;
    DyspQry: TIBQuery;
    GenIdQry: TIBQuery;
    GenIdQryGEN_ID: TIntegerField;
    qryCartELEMENT_ID: TIntegerField;
    qryCartWYDZIALY_ID: TIntegerField;
    qryCartSERIA_ID: TIntegerField;
    qryCartLIMIT_ID: TIntegerField;
    qryCartPZP_ID: TIntegerField;
    qryCartELEMENT_WGR_KOD: TIBStringField;
    qryCartMAGAZYN_DST_ID: TIntegerField;
    BindSourceDB2: TBindSourceDB;
    procedure ToolbarCloseButtonClick(Sender: TObject);
    procedure FormGesture(Sender: TObject;
      const EventInfo: TGestureEventInfo; var Handled: Boolean);
    procedure FormKeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
      Shift: TShiftState);
    procedure IconSearchClick(Sender: TObject);
    procedure IconXClick(Sender: TObject);
    procedure EditSearchKeyDown(Sender: TObject; var Key: Word;
      var KeyChar: Char; Shift: TShiftState);
    procedure IconHambMenuClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure CheckBoxSelectAllChange(Sender: TObject);
    procedure BtnSubmitOrderClick(Sender: TObject);
    procedure BtnDeleteClick(Sender: TObject);
    procedure MenuItem4Click(Sender: TObject);
    procedure MenuItem5Click(Sender: TObject);
    procedure IconLeftArrowClick(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
  private
    FGestureOrigin: TPointF;
    FGestureInProgress: Boolean;
    { Private declarations }
    procedure ShowToolbar(AShow: Boolean);
  public
    { Public declarations }
  end;

var
  KoszykForm: TKoszykForm;
  isEditVisible: Boolean = False;
  mousePosition: TScreen;

implementation

{$R *.fmx}

uses Unit6,Unit11;


procedure TKoszykForm.FormKeyDown(Sender: TObject; var Key: Word;
  var KeyChar: Char; Shift: TShiftState);
begin
  if Key = vkEscape then
    ShowToolbar(not ToolbarPopup.IsOpen);
end;

procedure TKoszykForm.IconHambMenuClick(Sender: TObject);
begin
  mousePosition := TScreen.Create(KoszykForm);
  PopupHambMenu.Popup(mousePosition.MousePos.X, mousePosition.MousePos.Y);
end;

procedure TKoszykForm.IconLeftArrowClick(Sender: TObject);
begin
Form6.Show;
Free;
end;

procedure TKoszykForm.IconSearchClick(Sender: TObject);
begin
  if isEditVisible then
  begin
    AnimHideEdit.Enabled := True;
    AnimShowEdit.Enabled := False;
    isEditVisible := False;
  end
  else
  begin
    AnimHideEdit.Enabled := False;
    AnimShowEdit.Enabled := True;
    isEditVisible := True;
  end;
end;


procedure TKoszykForm.IconXClick(Sender: TObject);
begin
  EditSearch.Text := '';
  IconX.Visible := False;
end;

procedure TKoszykForm.MenuItem4Click(Sender: TObject);
begin
  qryDelete.Close;
  qryDelete.SQL.Clear;
  qryDelete.SQL.Add('DELETE FROM MCD_DYSPOZYCJE_KOSZYK');
  qryDelete.Open;
  qryCart.Close;
  qryCart.Open;
  ClientDataSet1.Data := DataSetProvider1.Data;
end;

procedure TKoszykForm.MenuItem5Click(Sender: TObject);
var
  i: Integer;
  sqlDel: String;
begin
  qryDelete.Close;
  qryDelete.SQL.Clear;
  qryDelete.SQL.Add('DELETE FROM MCD_DYSPOZYCJE_KOSZYK');
  qryDelete.SQL.Add('WHERE MCD_DYSPOZYCJE_KOSZYK_ID IN (');
  for i := 0 to ListView1.ItemCount-1 do
    begin
      try
        if ListView1.Items[i].Checked then
          begin
            sqlDel := sqlDel + ListView1.Items[i].Text + ',';
          end;
      except
        Continue;
      end;
  end;
  sqlDel := sqlDel.Substring(0,sqlDel.Length-1);
  qryDelete.SQL.Add(sqlDel +')');
  qryDelete.Open;

  qryCart.Close;
  qryCart.Open;
  ClientDataSet1.Data := DataSetProvider1.Data;
end;

procedure TKoszykForm.ToolbarCloseButtonClick(Sender: TObject);
begin
  Application.Terminate;
end;

procedure TKoszykForm.BtnDeleteClick(Sender: TObject);
begin
  mousePosition := TScreen.Create(KoszykForm);
  PopupDelete.Popup(mousePosition.MousePos.X, mousePosition.MousePos.Y);
end;

procedure TKoszykForm.BtnSubmitOrderClick(Sender: TObject);
begin
 GenIdQry.Close;
    GenIdQry.Open;
    var genID := GenIdQryGEN_ID.Value;
    for var i:=0 to ListView1.ItemCount-1 do
    begin
      if ListView1.Items[i].Checked then
      begin
        DyspQry.Close;
        DyspQry.ParamByName('GENID').Value := genID;
        DyspQry.ParamByName('PRACOWNICY_ID').Value := '400001003';
        DyspQry.ParamByName('MAGAZYNY_ID').Value := ListView1.Items[i].Data['MAGAZYNY_ID'].AsString;
        DyspQry.ParamByName('WYDZIALY_ID').Value := ListView1.Items[i].Data['WYDZIALY_ID'].AsString;
        DyspQry.ParamByName('ID1').Value := ListView1.Items[i].Data['SERIA_ID'].AsString;
        DyspQry.ParamByName('ID2').Value := ListView1.Items[i].Data['LIMIT_ID'].AsString;
        DyspQry.ParamByName('ID3').Value := ListView1.Items[i].Data['PZP_ID'].AsString;
        DyspQry.ParamByName('ELEMENT_ID').Value := ListView1.Items[i].Data['ELEMENT_ID'].AsString;
        DyspQry.ParamByName('ELEMENT_WGR_KOD').Value := ListView1.Items[i].Data['ELEMENT_WGR_KOD'].AsString;
        DyspQry.ParamByName('ILOSC').Value := ListView1.Items[i].Data['Text4'].AsString;
        DyspQry.Open;
      end;
    end;
    Form6.Show;
    Free;
end;

procedure TKoszykForm.CheckBoxSelectAllChange(Sender: TObject);
begin
  if CheckBoxSelectAll.IsChecked then
  begin
    CheckBoxSelectAll.Text := 'Zaznacz wszystkie';
    ListView1.Items.CheckAll(False);
  end
  else
  begin
    CheckBoxSelectAll.Text := 'Odznacz wszystkie';
    ListView1.Items.CheckAll(True);
  end;
end;

procedure TKoszykForm.EditSearchKeyDown(Sender: TObject; var Key: Word;
  var KeyChar: Char; Shift: TShiftState);

begin
  if EditSearch.Text = '' then
    begin
      IconX.Visible := False;
    end
  else
    begin
      IconX.Visible := True;
    end;
end;

procedure TKoszykForm.FormCreate(Sender: TObject);

begin
  qryCart.Open;

end;

procedure TKoszykForm.FormDestroy(Sender: TObject);
begin
  IBTransaction1.Commit;
end;

procedure TKoszykForm.FormGesture(Sender: TObject;
  const EventInfo: TGestureEventInfo; var Handled: Boolean);
var
  DX, DY : Single;
begin
  if EventInfo.GestureID = igiPan then
  begin
    if (TInteractiveGestureFlag.gfBegin in EventInfo.Flags)
      and ((Sender = ToolbarPopup)
        or (EventInfo.Location.Y > (ClientHeight - 70))) then
    begin
      FGestureOrigin := EventInfo.Location;
      FGestureInProgress := True;
    end;

    if FGestureInProgress and (TInteractiveGestureFlag.gfEnd in EventInfo.Flags) then
    begin
      FGestureInProgress := False;
      DX := EventInfo.Location.X - FGestureOrigin.X;
      DY := EventInfo.Location.Y - FGestureOrigin.Y;
      if (Abs(DY) > Abs(DX)) then
        ShowToolbar(DY < 0);
    end;
  end
end;

procedure TKoszykForm.ShowToolbar(AShow: Boolean);
begin
  ToolbarPopup.Width := ClientWidth;
  ToolbarPopup.PlacementRectangle.Rect := TRectF.Create(0, ClientHeight-ToolbarPopup.Height, ClientWidth-1, ClientHeight-1);
  ToolbarPopupAnimation.StartValue := ToolbarPopup.Height;
  ToolbarPopupAnimation.StopValue := 0;

  ToolbarPopup.IsOpen := AShow;
end;

end.
