unit Unit6;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.Ani, FMX.Layouts, FMX.Gestures,
  FMX.StdCtrls, FMX.Controls.Presentation, FMX.Objects, IBX.IBCustomDataSet,
  IBX.IBUpdateSQL, IBX.IBQuery, IBX.IBSQL, Data.DB, IBX.IBDatabase, System.Rtti,
  FMX.Grid.Style, FMX.ScrollBox, FMX.Grid, FMX.Edit, FMX.Menus, Fmx.Bind.Grid,
  System.Bindings.Outputs, Fmx.Bind.Editors, Data.Bind.EngExt,
  Fmx.Bind.DBEngExt, Data.Bind.Components, Data.Bind.Grid, Data.Bind.DBScope, DateUtils, FMX.Graphics,
  FMX.ExtCtrls, System.StrUtils;

type
  TForm6 = class(TForm)
    StyleBook1: TStyleBook;
    ToolbarHolder: TLayout;
    ToolbarPopup: TPopup;
    ToolbarPopupAnimation: TFloatAnimation;
    ToolBar1: TToolBar;
    ToolbarApplyButton: TButton;
    ToolbarCloseButton: TButton;
    ToolbarAddButton: TButton;
    Panel1: TPanel;
    Image1: TImage;
    Z: TImage;
    Image3: TImage;
    Label1: TLabel;
    Image4: TImage;
    Image5: TImage;
    Image6: TImage;
    ImageCart: TImage;
    Label2: TLabel;
    Image8: TImage;
    IBTransaction1: TIBTransaction;
    qryTab: TIBQuery;
    IBQuery3ID: TIntegerField;
    IBQuery3KOD: TIBStringField;
    IBQuery3RODZAJ: TSmallintField;
    IBQuery3ILOSC_WYKORZYSTANA: TSmallintField;
    IBQuery3ILOSC_MAX: TSmallintField;
    Rectangle1: TRectangle;
    Edit1: TEdit;
    odkryj: TFloatAnimation;
    zakryj: TFloatAnimation;
    iks: TImage;
    cartBox: TImage;
    PopupMenu1: TPopupMenu;
    MenuItem1: TMenuItem;
    MenuItem2: TMenuItem;
    MenuItem3: TMenuItem;
    cartAnim: TFloatAnimation;
    BindingsList1: TBindingsList;
    DataSource1: TDataSource;
    BindSourceDB2: TBindSourceDB;
    Grid1: TStringGrid;
    LinkGridToDataSourceBindSourceDB22: TLinkGridToDataSource;
    procedure ToolbarCloseButtonClick(Sender: TObject);
    procedure FormGesture(Sender: TObject;
      const EventInfo: TGestureEventInfo; var Handled: Boolean);
    procedure FormKeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
      Shift: TShiftState);
    procedure Image4Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Edit1KeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
      Shift: TShiftState);
    procedure ImageCartClick(Sender: TObject);
    procedure Image8Click(Sender: TObject);
    procedure Grid1CellDblClick(const Column: TColumn; const Row: Integer);
    procedure ZClick(Sender: TObject);
    procedure Image3Click(Sender: TObject);
    procedure Grid1DrawColumnCell(Sender: TObject; const Canvas: TCanvas;
      const Column: TColumn; const Bounds: TRectF; const Row: Integer;
      const Value: TValue; const State: TGridDrawStates);
    procedure Image6Click(Sender: TObject);
  private
    FGestureOrigin: TPointF;
    FGestureInProgress: Boolean;
    { Private declarations }
    procedure ShowToolbar(AShow: Boolean);
  public
    { Public declarations }
  end;

var
  Form6: TForm6;
  sw: boolean;
  mousePosition: TScreen;
  dataDzis: TDateTime;
  dataStr: String;

implementation

{$R *.fmx}

uses Unit2,Unit11, Unit4, Unit8, Unit9, UnitKoszyk;
{$R *.LgXhdpiPh.fmx ANDROID}
{$R *.Macintosh.fmx MACOS}
{$R *.SSW3.fmx ANDROID}

procedure TForm6.FormKeyDown(Sender: TObject; var Key: Word;
  var KeyChar: Char; Shift: TShiftState);
begin
  if Key = vkEscape then
    ShowToolbar(not ToolbarPopup.IsOpen);
end;

//na mobilnej daæ na pojedynczy klik
procedure TForm6.Grid1CellDblClick(const Column: TColumn; const Row: Integer);
begin
  TForm9.Create(self).Show;
  Hide;
end;

//kolorowanie grida
procedure TForm6.Grid1DrawColumnCell(Sender: TObject; const Canvas: TCanvas;
  const Column: TColumn; const Bounds: TRectF; const Row: Integer;
  const Value: TValue; const State: TGridDrawStates);
begin
  var bgBrush: TBrush;
  bgBrush:= TBrush.Create(TBrushKind.Solid, TAlphaColors.White);
  try
    if (Sender as TStringGrid).Cells[ 2, Row ] = '1' then
      bgBrush.Color := TAlphaColors.Darksalmon
    else if (Sender as TStringGrid).Cells[ 2, Row ] = '2' then
      bgBrush.Color := TAlphaColors.Deepskyblue
    else
      bgBrush.Color := TAlphaColors.Springgreen;
    Canvas.FillRect(Bounds, 0, 0, [], 1, bgBrush);
  finally
    bgBrush.Free;
  end;
  Column.DefaultDrawCell(Canvas, Bounds, Row, Value, State);
end;

procedure TForm6.Image3Click(Sender: TObject);
begin
  dataDzis := IncDay(dataDzis, -1);
  Label1.Text := DateToStr(dataDzis);
  qryTab.Close;
  qryTab.ParamByName('dataVar').Value := DateToStr(dataDzis);
  qryTab.Open;
end;

procedure TForm6.Image4Click(Sender: TObject);
begin
if sw then
    begin
      odkryj.Enabled:=false;
      zakryj.Enabled:=true;
      sw:=false
    end
  else
    begin
      zakryj.Enabled:=false;
      odkryj.enabled:=true;
      sw:=true;
    end;

end;

procedure TForm6.Image6Click(Sender: TObject);
begin
  TForm8.Create(self).Show;
  Hide;
end;

procedure TForm6.ImageCartClick(Sender: TObject);
begin
UnitKoszyk.TKoszykForm.Create(Self).Show;
Hide;
end;

procedure TForm6.Image8Click(Sender: TObject);
begin
  mousePosition := TScreen.Create(Form6);
  PopupMenu1.Popup(mousePosition.MousePos.X, mousePosition.MousePos.Y);
end;

procedure TForm6.ToolbarCloseButtonClick(Sender: TObject);
begin
  Application.Terminate;
end;

procedure TForm6.ZClick(Sender: TObject);
begin
  dataDzis := IncDay(dataDzis, 1);
  Label1.Text := DateToStr(dataDzis);
  qryTab.Close;
  qryTab.ParamByName('dataVar').Value := DateToStr(dataDzis);
  qryTab.Open;

end;



procedure TForm6.Edit1KeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
  Shift: TShiftState);
begin
  if edit1.Text <> '' then
  begin
    iks.Visible := True;
  end
end;

//FormCreate
procedure TForm6.FormCreate(Sender: TObject);
begin

  sw := False;
  //Grid1.Columns[0].Width := -1;
  //Grid1.Columns[2].Width := -1;
//data parametrem
  dataDzis := EncodeDateTime(2021,5,5,0,0,0,0);
  //dataDzis := Now;

  qryTab.Close;
  //sposób stringiem
  dataStr := '05.05.2021';
  qryTab.ParamByName('dataVar').Value := DateToStr(dataDzis);

  Label1.Text := DateToStr(dataDzis);
  qryTab.Open;
end;

procedure TForm6.FormGesture(Sender: TObject;
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

procedure TForm6.ShowToolbar(AShow: Boolean);
begin
  ToolbarPopup.Width := ClientWidth;
  ToolbarPopup.PlacementRectangle.Rect := TRectF.Create(0, ClientHeight-ToolbarPopup.Height, ClientWidth-1, ClientHeight-1);
  ToolbarPopupAnimation.StartValue := ToolbarPopup.Height;
  ToolbarPopupAnimation.StopValue := 0;

  ToolbarPopup.IsOpen := AShow;
end;

end.
