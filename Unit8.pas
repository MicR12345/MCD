unit Unit8;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, System.Rtti,
  FMX.Grid.Style, Data.Bind.EngExt, Fmx.Bind.DBEngExt, Fmx.Bind.Grid,
  System.Bindings.Outputs, Fmx.Bind.Editors, Data.Bind.Components,
  Data.Bind.Grid, Data.Bind.DBScope, Data.DB, IBX.IBCustomDataSet, IBX.IBQuery,
  IBX.IBDatabase, FMX.Grid, FMX.StdCtrls, FMX.ScrollBox, FMX.Menus, FMX.Objects,
  FMX.Edit, FMX.Controls.Presentation, FMX.Ani, FMX.Layouts, Data.Bind.Controls,
  Fmx.Bind.Navigator;

type
  TForm8 = class(TForm)
    panel1: TPanel;
    Label1: TLabel;
    Image1: TImage;
    Image2: TImage;
    Image3: TImage;
    name: TLabel;
    Image4: TImage;
    Image5: TImage;
    Image6: TImage;
    Image7: TImage;
    Image8: TImage;
    Edit1: TEdit;
    Rectangle1: TRectangle;
    searchAnim: TFloatAnimation;
    searchAnim2: TFloatAnimation;
    clr: TImage;
    koszykCount: TLabel;
    PopupMenu1: TPopupMenu;
    MenuItem1: TMenuItem;
    MenuItem2: TMenuItem;
    MenuItem3: TMenuItem;
    koszyk: TPanel;
    pokaz: TCornerButton;
    zloz: TCornerButton;
    pocz: TPanel;
    grd: TStringGrid;
    StringColumn1: TStringColumn;
    CheckColumn1: TCheckColumn;
    Button3: TButton;
    transMCD: TIBTransaction;
    qryDysp: TIBQuery;
    Grid2: TGrid;
    BindSourceDB1: TBindSourceDB;
    BindingsList1: TBindingsList;
    LinkGridToDataSourceBindSourceDB1: TLinkGridToDataSource;
    qryDyspMCD_DYSPOZYCJE_ID: TIntegerField;
    qryDyspNUMER_DYSPOZYCJI: TIBStringField;
    qryDyspSTATUS: TSmallintField;
    qryDyspINS_DATE: TDateTimeField;
    qryDyspSERIA_ID: TIntegerField;
    qryDyspLIMIT_ID: TIntegerField;
    qryDyspPZP_ID: TIntegerField;
    qryDyspMAGAZYN_DST_ID: TIntegerField;
    qryDyspMAGAZYNY_KOD: TIBStringField;
    qryDyspWYDZIALY_ID: TIntegerField;
    qryDyspWYDZIALY_KOD: TIBStringField;
    qryDyspSERIA_KOD: TIBStringField;
    qryDyspLIMIT_KOD: TIBStringField;
    qryDyspPZP_KOD: TIBStringField;
    qryDysp2: TIBQuery;
    Grid1: TGrid;
    qryDysp2ELEMENT_ID: TIntegerField;
    qryDysp2ELEMENT_KOD: TIBStringField;
    qryDysp2ELEMENT_NAZWA: TIBStringField;
    qryDysp2JEDNOSTKI_KOD: TIBStringField;
    qryDysp2ILOSC: TFloatField;
    qryDysp2ILOSC_WYD: TFloatField;
    qryDysp2STATUS: TSmallintField;
    BindSourceDB2: TBindSourceDB;
    LinkGridToDataSourceBindSourceDB2: TLinkGridToDataSource;
    StyleBook2: TStyleBook;
    procedure FormCreate(Sender: TObject);
    procedure Grid2CellClick(const Column: TColumn; const Row: Integer);
    procedure Button1Click(Sender: TObject);
    procedure Image4Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form8: TForm8;

implementation

{$R *.fmx}

uses Unit4,Unit11, UnitKoszyk, Unit6;

procedure TForm8.Button1Click(Sender: TObject);
begin
  Form6.Show;
  Free;
end;

procedure TForm8.FormCreate(Sender: TObject);
begin
  qryDysp.open;
end;

procedure TForm8.Grid2CellClick(const Column: TColumn; const Row: Integer);
begin
  qryDysp2.Close;
  qryDysp2.ParamByName('param').Value:=qryDyspMCD_DYSPOZYCJE_ID.AsString;
  qryDysp2.Open;
end;

procedure TForm8.Image4Click(Sender: TObject);
begin
  TKoszykForm.Create(Form6).Show;
  Free;
end;

end.
