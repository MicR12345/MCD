unit Unit4;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.Ani, FMX.Layouts, FMX.Gestures,
  FMX.StdCtrls, FMX.Controls.Presentation, FMX.Objects, Data.DB,
  IBX.IBCustomDataSet, IBX.IBQuery, IBX.IBDatabase,FMX.Edit, System.Rtti,
  FMX.Grid.Style, FMX.Grid, FMX.ScrollBox, FMX.Menus, Data.Bind.Components,
  Datasnap.DBClient, Fmx.Bind.Grid, System.Bindings.Outputs, Fmx.Bind.Editors,
  Data.Bind.EngExt, Fmx.Bind.DBEngExt, Data.Bind.Grid, Data.Bind.DBScope;
type

  TForm4 = class(TForm)
    StyleBook1: TStyleBook;
    ToolbarHolder: TLayout;
    ToolbarPopup: TPopup;
    ToolbarPopupAnimation: TFloatAnimation;
    ToolBar1: TToolBar;
    ToolbarApplyButton: TButton;
    ToolbarCloseButton: TButton;
    ToolbarAddButton: TButton;
    Label1: TLabel;
    Image1: TImage;
    Image2: TImage;
    panel1: TPanel;
    Image3: TImage;
    Image4: TImage;
    Image5: TImage;
    Image6: TImage;
    Image7: TImage;
    Image8: TImage;
    Button1: TButton;
    Edit1: TEdit;
    Rectangle1: TRectangle;
    searchAnim: TFloatAnimation;
    searchAnim2: TFloatAnimation;
    clr: TImage;
    PopupMenu1: TPopupMenu;
    MenuItem2: TMenuItem;
    MenuItem3: TMenuItem;
    koszykCount: TLabel;
    koszyk: TPanel;
    pokaz: TCornerButton;
    zloz: TCornerButton;
    transMCD: TIBTransaction;
    qryMCD: TIBQuery;
    qryMCDARTYKUL_ID: TIntegerField;
    qryMCDARTYKUL_KOD: TIBStringField;
    qryMCDARTYKUL_OPIS: TIBStringField;
    qryMCDREALIZACJA: TIBStringField;
    qryMCDILOSC_MAX: TFloatField;
    qryMCDWGR_KOD: TIBStringField;
    qryMCDATTACHMENT: TSmallintField;
    BindSourceDB1: TBindSourceDB;
    GridBindSourceDB1: TGrid;
    LinkGridToDataSourceBindSourceDB1: TLinkGridToDataSource;
    BindingsList1: TBindingsList;
    MenuItem1: TMenuItem;
    pocz: TPanel;
    grd: TStringGrid;
    StringColumn1: TStringColumn;
    CheckColumn1: TCheckColumn;
    Button3: TButton;
    label2: TLabel;
    procedure Button1Click(Sender: TObject);
    procedure Image8Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Edit1Click(Sender: TObject);
    procedure Edit1KeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
      Shift: TShiftState);
    procedure clrClick(Sender: TObject);
    procedure Image3Click(Sender: TObject);
    procedure Image4Click(Sender: TObject);
    procedure zlozClick(Sender: TObject);
    procedure pokazClick(Sender: TObject);
    procedure Image6Click(Sender: TObject);
    procedure GridBindSourceDB1CellClick(const Column: TColumn;
      const Row: Integer);




  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form4: TForm4;
  szt,poczCount,i:Integer;
  txt:String;
  sw,kosz,dysp:boolean;
  x1,x2:Integer;
  mouse:TScreen;

implementation

{$R *.fmx}

uses Unit5, Unit2,Unit11, Unit6, Unit8, UnitKoszyk;
{$R *.LgXhdpiPh.fmx ANDROID}


procedure TForm4.Image3Click(Sender: TObject);
begin
 mouse := TScreen.Create(Form4);
  PopupMenu1.Popup(mouse.MousePos.X, mouse.MousePos.Y);
end;

procedure TForm4.Image4Click(Sender: TObject);
begin
TKoszykForm.Create(Self).Show;
Free;

end;




procedure TForm4.Image6Click(Sender: TObject);
begin
  TForm8.Create(Self).ShowModal;
end;

procedure TForm4.Image8Click(Sender: TObject);
begin
  if sw then
    begin
      searchAnim.Enabled:=false;
      searchAnim2.Enabled:=true;
      sw:=false
    end
  else
    begin
      searchAnim2.Enabled:=false;
      searchAnim.enabled:=true;
      sw:=true;
    end;
end;

procedure TForm4.pokazClick(Sender: TObject);
begin
showMessage('Koszyk');
end;




procedure TForm4.Button1Click(Sender: TObject);
begin
  Form6.Show;
  Free;
end;






procedure TForm4.clrClick(Sender: TObject);
begin
  edit1.text:='';
  clr.Visible:=False;
end;

procedure TForm4.zlozClick(Sender: TObject);
begin
  //TForm5.Create(self).ShowModal; huh?
  if dysp then
  begin
    showMessage('Dyspozycja z³o¿ona');
  end;
end;

procedure TForm4.Edit1Click(Sender: TObject);
begin
  if not edit1.text.isEmpty then
  begin
    clr.Visible:=true;
  end
  else
  begin
    clr.Visible:=false;
  end;
end;

procedure TForm4.Edit1KeyDown(Sender: TObject; var Key: Word; var KeyChar: Char;
  Shift: TShiftState);
begin
  //Obs³uga backspace aby nie musiec wciskac przycisku na pustym edicie to schowania x
  if Key.ToString='8' then
  begin
    if edit1.text.Length=1 then
    begin
      clr.Visible:=false;
    end;
  end;

  if not edit1.text.isempty then
  begin
    clr.Visible:=true;
  end

  else
  begin
    clr.Visible:=false;
  end;
end;



procedure TForm4.FormCreate(Sender: TObject);
begin
  sw:=false;
  kosz:=true;
  i:=0;
  qryMCD.Close;
  qryMCD.ParamByName('param1').Value:=Form6.IBQuery3ID.AsString;
  qryMCD.ParamByName('param2').Value:=Form6.IBQuery3RODZAJ.AsString;
  Label1.Text:=Form6.IBQuery3ID.AsString;
  qryMCD.Open;


end;


procedure TForm4.GridBindSourceDB1CellClick(const Column: TColumn;
  const Row: Integer);
begin
  TForm2.Create(self).Show;
  Free;
end;

end.
